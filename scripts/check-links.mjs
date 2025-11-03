#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { access } from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';

const root = path.resolve('dist');
const htmlFiles = await fg('**/*.html', { cwd: root });
const missing = new Map();

const isExternal = (url) => {
  return /^(https?:)?\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('javascript:') || url.startsWith('data:');
};

const normalize = (url) => {
  const [base] = url.split('#');
  return base.split('?')[0];
};

for (const file of htmlFiles) {
  const absPath = path.join(root, file);
  const dir = path.dirname(absPath);
  const content = await readFile(absPath, 'utf8');

  const references = [];
  const hrefRegex = /href="([^"]+)"/g;
  const srcRegex = /src="([^"]+)"/g;

  let match;
  while ((match = hrefRegex.exec(content))) {
    references.push(match[1]);
  }
  while ((match = srcRegex.exec(content))) {
    references.push(match[1]);
  }

  for (const ref of references) {
    if (!ref || ref.startsWith('#') || isExternal(ref)) continue;
    const targetLink = normalize(ref);
    if (!targetLink) continue;
    const targetPath = path.resolve(dir, targetLink);

    try {
      await access(targetPath);
    } catch {
      // allow directory references without trailing index.html
      const altPath = path.join(targetPath, 'index.html');
      try {
        await access(altPath);
      } catch {
        if (!missing.has(file)) {
          missing.set(file, new Set());
        }
        missing.get(file).add(ref);
      }
    }
  }
}

if (missing.size) {
  console.error('Liens internes manquants détectés :');
  for (const [file, refs] of missing) {
    for (const ref of refs) {
      console.error(` - ${file} -> ${ref}`);
    }
  }
  process.exit(1);
} else {
  console.log('Check liens internes : OK');
}
