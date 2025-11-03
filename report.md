# Boost Activity – Rapport de livraison

## Liens essentiels
- **Dépôt** : https://github.com/Boostactivity/boost-activity-site
- **GitHub Pages** : https://boostactivity.github.io/boost-activity-site/
- **Export Lovable** : `export-lovable/export-lovable.zip` (généré par `npm run build`)

## Périmètre livré
- Navigation unique responsive (desktop & mobile) avec skip-link, aria, focus trap et fermeture auto.
- Palette et variables refondues (`assets/css/theme.css`) selon la charte Boost Activity, déclinaisons dans `main.css` (utilitaires, formulaires, CTA, placeholders).
- Refonte complète des pages HTML : accueil, services (index + 5 fiches), cas clients, à propos, approche, méthodologie, FAQ, contact, légales.
  - Chemins 100 % relatifs (support Project Pages & Lovable).
  - Titre + meta description uniques, balises OG/Twitter par page.
  - Services structurés « Pourquoi / Comment / Impact / Résultats attendus » avec tableaux comparatifs et CTA complémentaires.
  - `cas-clients` : 6 études de cas chiffrées + témoignages, section méthode commune.
  - `approche`, `methodologie`, `faq` : contenus éditoriaux complets, timelines, accordéons `<details>`.
  - `contact` : formulaire accessible (honeypot, labels), liens WhatsApp / mail / tel / Cal.com.
- Mise à jour CSS globale (utilitaires margin, contact, skip-link, placeholders) et ajout du placeholder `assets/img/team-placeholder.svg`.
- `sitemap.xml`/`robots.txt` synchronisés, build `dist/` + export Lovable régénérés.

## Pages modifiées / ajoutées
- `src/index.html` – hero refondu, messaging H1 « Propulsez votre entreprise plus loin », stats, Drop Eats highlight, skip-link.
- `src/services/index.html` – sommaire services, packages, comparatif KPI, FAQ, CTA.
- `src/services/` (`dropeats`, `acquisition-locale`, `seo-local`, `creation-assets`, `gestion-uber-deliveroo`) – sections Pourquoi/Comment/Impact/Résultats, tables, timeline, CTA.
- `src/cas-clients/index.html` – 6 cas détaillés, stats, méthode commune, CTA.
- `src/a-propos/index.html`, `src/approche/index.html`, `src/methodologie/index.html`, `src/faq/index.html` – contenus éditoriaux enrichis, timelines, témoignages, FAQ `<details>`.
- `src/contact/index.html` – formulaire accessible, champs honeypot, liens WhatsApp / mail / tel / Cal.com, FAQ contact.
- `src/legal/mentions.html` & `src/legal/privacy.html` – structure uniforme, placeholders TODO (SIRET, DPO…), navigation alignée.
- `assets/css/theme.css`, `assets/css/main.css` – palette, utilitaires (`mt-*`, `no-margin`, `honeypot`), contact, skip-link, new grids.
- `assets/img/team-placeholder.svg` – visuel temporaire clairement nommé.
- `sitemap.xml` – ajout approhe/methodologie/faq + fiches services.

## Qualité & build
- `npm run lint:html`
- `npm run lint:css`
- `npm run build`
- `node scripts/check-links.mjs`
→ tous OK le 20/04/2025 à 21:56 CET.

## TODO / entrées à compléter
- Remplacer les visuels placeholders (`assets/img/logo-placeholder.svg`, `hero-placeholder.svg`, `team-placeholder.svg`, `og-image.png`, `favicon.png`) par les assets officiels.
- Renseigner les identifiants Google Tag Manager & Meta Pixel (placeholders dans `src/index.html`).
- Confirmer / ajuster :
  - Numéro WhatsApp (`https://wa.me/33600000000`)
  - Lien Cal.com (`https://cal.com/boostactivity/rdv`)
  - SIRET, capital, responsable publication, contact DPO (`<!-- TODO: compléter -->`).

## Checklist Lovable
1. Dans Lovable, connecter le dépôt miroir `github-link-launch` (branche `main`).
2. Paramétrer :
   - **Build command** : `npm ci && npm run build`
   - **Output directory** : `dist`
3. Si l’interface ne déclenche pas la build, importer `export-lovable/export-lovable.zip` (fallback statique).
4. Vérifier l’aperçu (navigation, assets, formulaires), puis publier.

**Causes fréquentes d’absence dans Lovable et correctifs UI**
- Dépôt non sélectionné : vérifier l’onglet *Connect GitHub* puis choisir `github-link-launch`.
- Build non déclarée : renseigner `npm ci && npm run build` et `dist` dans *Build settings*.
- Répertoire de sortie erroné : s’assurer que *Output directory* = `dist` (ou `/` si mode statique).
- Branch incorrecte : confirmer que la branche par défaut est `main`.
- Dépôt privé : activer les permissions ou rendre le dépôt public pour l’aperçu.

## Notes complémentaires
- Les chemins relatifs sont compatibles Project Pages et environnement Lovable.
- Les cookies/tracking restent inactifs tant que le consentement n’est pas stocké (`boost-activity-consent`).
- Reportez-vous au README pour la procédure complète (palette, scripts, déploiement).
