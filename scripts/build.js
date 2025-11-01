#!/usr/bin/env node
import { build as esbuild } from 'esbuild';
import { mkdir, rm, readFile, writeFile, cp } from 'node:fs/promises';
import { existsSync, createWriteStream } from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import * as csso from 'csso';
import archiver from 'archiver';

const isWatch = process.argv.includes('--watch');
const root = process.cwd();
const distDir = path.join(root, 'dist');
const exportDir = path.join(root, 'export-lovable');
const zipPath = path.join(root, 'export-lovable.zip');

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function minifyCssFiles() {
  const cssFiles = await fg('assets/css/*.css');
  for (const file of cssFiles) {
    const raw = await readFile(file, 'utf8');
    const minified = csso.minify(raw).css;
    const targetPath = path.join(distDir, file);
    await ensureDir(path.dirname(targetPath));
    await writeFile(targetPath, minified, 'utf8');
  }
}

async function copyStatic() {
  await ensureDir(path.join(distDir, 'assets'));
  await cp('assets/img', path.join(distDir, 'assets', 'img'), { recursive: true });
  await cp('src', distDir, { recursive: true });
  if (existsSync('robots.txt')) {
    await cp('robots.txt', path.join(distDir, 'robots.txt'));
  }
  if (existsSync('sitemap.xml')) {
    await cp('sitemap.xml', path.join(distDir, 'sitemap.xml'));
  }
  if (existsSync('docs')) {
    await cp('docs', path.join(distDir, 'docs'), { recursive: true });
  }
}

async function bundleJs() {
  await esbuild({
    entryPoints: ['assets/js/main.js'],
    outfile: path.join(distDir, 'assets/js/main.js'),
    bundle: true,
    minify: true,
    sourcemap: true,
    target: 'es2018',
    logLevel: 'silent',
  });
}

async function createExport() {
  await cp(distDir, exportDir, { recursive: true });
  await new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(exportDir, false);
    archive.finalize();
  });
}

async function runBuild() {
  await rm(distDir, { recursive: true, force: true });
  await rm(exportDir, { recursive: true, force: true });
  await rm(zipPath, { force: true });

  await ensureDir(distDir);
  await bundleJs();
  await minifyCssFiles();
  await copyStatic();
  await createExport();
  console.log(`[build] Terminé à ${new Date().toLocaleTimeString('fr-FR')}`);
}

if (isWatch) {
  const chokidar = (await import('chokidar')).default;
  let building = false;
  let pending = false;

  const triggerBuild = async () => {
    if (building) {
      pending = true;
      return;
    }
    building = true;
    try {
      await runBuild();
    } catch (error) {
      console.error('[build] Erreur', error);
    } finally {
      building = false;
      if (pending) {
        pending = false;
        triggerBuild();
      }
    }
  };

  await triggerBuild();
  console.log('[dev] Watch mode actif');
  const watcher = chokidar.watch(['src/**/*', 'assets/**/*', 'robots.txt', 'sitemap.xml'], {
    ignoreInitial: true,
  });
  watcher.on('all', triggerBuild);
} else {
  await runBuild();
}
