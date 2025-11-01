# Boost Activity – Site vitrine

Ce dépôt contient la refonte du modèle Educademy adaptée à l'identité **Boost Activity**. Le site est statique (HTML/CSS/JS) et s'appuie sur un pipeline Node.js minimal pour la construction, la minification et l'export.

## Structure
- `src/` – pages HTML prêtes pour l'intégration (accueil, services, contact).
- `assets/` – styles, scripts et visuels (placeholders à remplacer si besoin).
- `scripts/build.js` – script de build (esbuild + minification + export Lovable).
- `src_raw/` – copie brute du snapshot HTTrack (non utilisée au build, conservée en référence).
- `dist/` – sortie de build (générée).
- `export-lovable/` & `export-lovable.zip` – export nettoyé pour Lovable (générés).

## Palette & branding
Les variables de couleur sont définies dans `assets/css/theme.css`. Pour modifier la charte :
1. Ajuster les variables `--brand-*` ainsi que `--primary`, `--primary-hover`, `--text`, etc.
2. Rafraîchir les gradients éventuels dans `assets/css/main.css` si nécessaire.

Les logos temporaires sont stockés dans `assets/img/`. Remplacez `logo-placeholder.svg`, `hero-placeholder.svg`, `favicon.png` et `og-image.png` par vos visuels finaux (même noms de fichiers pour éviter de casser les références).

## Contenu & services
Les pages de services sont regroupées dans `src/services/`. Chaque fichier contient :
- un en-tête harmonisé avec le menu principal,
- les sections « impact », « livrables » et CTA,
- des métadonnées SEO/OG prêtes à personnaliser.

La page contact `src/contact/index.html` expose le formulaire mailto, le lien WhatsApp (`https://wa.me/0000000000`) et le bouton calendrier (`https://cal.com/votre-calendrier`). Remplacez les placeholders par vos informations réelles.

## Développement
```bash
npm install
npm run dev   # build initial + watch (dist/ se rafraîchit)
```
Le mode watch regénère `dist/`, `export-lovable/` et `export-lovable.zip` à chaque modification détectée sur `src/`, `assets/`, `robots.txt` ou `sitemap.xml`.

### Lint & qualité
```bash
npm run lint:html   # contrôle accessibilité/structure HTML
npm run lint:css    # vérification Stylelint
```

## Build & export
```bash
npm run build
```
Ce script :
1. Nettoie `dist/`, `export-lovable/` et l'archive `.zip`.
2. Bundle et minifie le JS via esbuild.
3. Minifie les CSS (csso).
4. Copie les HTML/visuels/statics vers `dist/`.
5. Crée le miroir Lovable (`export-lovable/`) + `export-lovable.zip` prêt à importer.

## Prévisualisation locale
```bash
npm run preview
```
Lance un serveur HTTP statique sur `dist/` (http-server). Utilisez ce script après `npm run build`.

## Déploiement GitHub Pages
Le workflow `/.github/workflows/pages.yml` build automatiquement le site et publie le contenu de `dist/` sur GitHub Pages (mode « Pages from Actions »). Assurez-vous d'activer GitHub Pages sur la branche `gh-pages` générée par le workflow.

## À compléter
- Renseigner les identifiants Google Tag Manager et Meta Pixel (placeholders dans `src/index.html`).
- Actualiser le numéro WhatsApp et l'URL de prise de rendez-vous.
- Remplacer les visuels placeholder par les assets officiels si disponibles.
- Renseigner les métadonnées OG/Twitter spécifiques à chaque page si besoin.
