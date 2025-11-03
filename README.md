# Boost Activity – site vitrine

Site professionnel statique (HTML/CSS/JS) pour la marque **Boost Activity**. Le dépôt inclut l’ensemble des pages métiers, un pipeline de build et un export Lovable prêt à l’emploi.

## Structure principale
- `src/`
  - `index.html` (accueil)
  - `services/` : index + fiches DropEats, acquisition locale, SEO local, création d’assets, gestion Uber/Deliveroo
  - `cas-clients/`, `a-propos/`, `contact/`
  - `legal/` : mentions légales & politique de confidentialité
- `assets/` : styles (`css`), scripts (`js`), images (placeholders explicites)
- `scripts/`
  - `build.js` : bundle/minification + export Lovable
  - `check-links.mjs` : vérification des liens internes sur `dist/`
- `dist/` : build de production (généré)
- `export-lovable/` + `export-lovable.zip` : miroir statique pour Lovable (générés)
- `report.md` : synthèse de livraison, TODO et consignes Lovable

## Développement
```bash
npm install
npm run dev          # build initial + watch (dist/ et export-lovable/ mis à jour)
```

### Qualité
```bash
npm run lint:html    # accessibilité & structure (html-validate)
npm run lint:css     # conventions CSS (stylelint)
node scripts/check-links.mjs   # vérifie les liens internes sur dist/
```

## Build & export
```bash
npm run build
```
Le script :
1. Nettoie `dist/`, `export-lovable/` et `export-lovable.zip`.
2. Bundle le JS (`assets/js/main.js`) avec esbuild et minifie les CSS.
3. Copie HTML, images, robots.txt et sitemap vers `dist/`.
4. Duplique `dist/` dans `export-lovable/` puis génère `export-lovable.zip`.

Prévisualisation locale :
```bash
npm run preview      # sert dist/ via http-server
```

## Personnalisation
- **Palette & ton** : modifier `assets/css/theme.css` (`--brand-*`, `--primary`, etc.). Ajuster les gradients dédiés dans `assets/css/main.css` si besoin.
- **Visuels** : remplacer dans `assets/img/` les placeholders (`logo-placeholder.svg`, `hero-placeholder.svg`, `og-image.png`, `favicon.png`) par les assets réels en conservant les noms.
- **Contenus** :
  - Pages services (`src/services/*.html`) structurées en sections « Pourquoi / Comment / Impact / Résultats attendus » avec tableaux comparatifs et CTA.
  - `src/cas-clients/index.html` : études de cas chiffrées + témoignages (adapter aux références réelles).
  - `src/contact/index.html` : formulaire `mailto`, lien WhatsApp `https://wa.me/33600000000` et prise de rendez-vous `https://cal.com/boostactivity/rdv`.
  - Légales (`src/legal/`) : compléter SIRET, responsable publication, contact DPO (`<!-- TODO: compléter -->`).
- **Tracking** : placeholders Google Tag Manager & Meta Pixel dans `src/index.html`.

## Déploiement GitHub Pages
- Branch `main` → workflow GitHub Actions (déjà présent) construit `dist/` et publie sur Pages (mode « Project Pages »).
- Toutes les ressources utilisent des chemins relatifs (`assets/...`, `../assets/...`), aucun `<base>` requis.
- URL de preview : `https://boostactivity.github.io/boost-activity-site/`.

## Lovable
- Build command : `npm ci && npm run build`
- Output directory : `dist`
- Export statique alternatif : `export-lovable/` ou archive `export-lovable.zip`
- Pensez à connecter le dépôt miroir `github-link-launch` côté Lovable et sélectionner ces paramètres dans l’interface.

## À compléter avant mise en ligne
- Renseigner les identifiants de tracking (GTM, Meta Pixel) une fois le consentement validé.
- Remplacer les visuels placeholders par des photos/vidéos officielles.
- Mettre à jour WhatsApp et lien Cal.com avec les coordonnées définitives.
- Compléter SIRET, responsables et mentions légales exactes.
