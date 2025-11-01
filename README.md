# Boost Activity – Site vitrine

Ce dépôt contient la refonte du modèle Educademy adaptée à l'identité **Boost Activity**. Le site est statique (HTML/CSS/JS) et s'appuie sur un pipeline Node.js minimal pour la construction, la minification et l'export.

## Structure
- `src/` – pages HTML prêtes pour l'intégration :
  - `index.html` (accueil)
  - `services/` (index + offres DropEats, acquisition locale, SEO, assets, gestion Uber/Deliveroo)
  - `contact/`, `a-propos/`, `cas-clients/`
  - `legal/` (mentions légales & politique de confidentialité)
- `assets/` – styles, scripts et visuels (placeholders à remplacer si besoin).
- `scripts/build.js` – script de build (esbuild + minification + export Lovable).
- `dist/` – sortie de build (générée).
- `export-lovable/` & `export-lovable.zip` – export nettoyé pour Lovable (générés).
- `report.md` – récapitulatif de livraison (URLs, TODO restants, consignes Lovable).

## Palette & branding
Les variables de couleur sont définies dans `assets/css/theme.css`. Pour modifier la charte :
1. Ajuster les variables `--brand-*` ainsi que `--primary`, `--primary-hover`, `--text`, etc.
2. Rafraîchir les gradients éventuels dans `assets/css/main.css` si nécessaire.

Les logos temporaires sont stockés dans `assets/img/`. Remplacez `logo-placeholder.svg`, `hero-placeholder.svg`, `favicon.png` et `og-image.png` par vos visuels finaux (même noms de fichiers pour éviter de casser les références).

## Contenu & services
- Les pages de services sont regroupées dans `src/services/`. Chaque fiche reprend le même socle (impact, livrables, durée, CTA) et le menu déroulant principal.
- `src/cas-clients/index.html` rassemble études de cas + avis (remplacez les données chiffrées si nécessaire).
- `src/a-propos/index.html` détaille mission, équipe et jalons. Adaptez la section « Quelques repères » et les fiches équipe selon vos profils.
- `src/contact/index.html` expose le formulaire mailto, le lien WhatsApp (`https://wa.me/0000000000`) et le bouton calendrier (`https://cal.com/votre-calendrier`). Remplacez les placeholders par vos informations réelles.
- Les pages légales sont dans `src/legal/`. Mettez à jour les informations (SIRET, adresse, durée de conservation…) avant mise en ligne.

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
