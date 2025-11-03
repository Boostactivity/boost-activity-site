# Boost Activity – Rapport de livraison

## Liens essentiels
- **Dépôt** : https://github.com/Boostactivity/boost-activity-site
- **GitHub Pages** : https://boostactivity.github.io/boost-activity-site/
- **Export Lovable** : `export-lovable/export-lovable.zip` (généré par `npm run build`)

## Périmètre livré
- Navigation unique responsive (desktop & mobile) avec aria-labels, focus trap et fermeture auto.
- Refactoring complet des pages HTML (accueil, services, cas clients, à propos, contact, légales) :
  - Chemins 100 % relatifs (support Project Pages).
  - Titre + meta description uniques, balises OG/Twitter per-page.
  - Sections services structurées « Pourquoi / Comment / Impact / Résultats » + tableaux comparatifs.
  - `cas-clients` enrichi (cas chiffrés, témoignages, tableau consolidé).
- Mise à jour CSS (tableaux comparatifs, footer links, helpers responsive) et JS (suppression de `BASE`, menu/burger accessible).
- `sitemap.xml` & `robots.txt` alignés sur l’arborescence actuelle.

## Pages modifiées / ajoutées
- `src/index.html` – contenu héro, proposition de valeur, CTA, témoignages, CTA final.
- `src/services/*.html` – structure services, CTA mini, tableaux KPI, liens relatifs corrigés.
- `src/services/index.html` – sommaire services + comparatif rapide + formules d’accompagnement.
- `src/cas-clients/index.html` – études de cas, tableau KPI consolidé, CTA contact.
- `src/a-propos/index.html` – storytelling, repères, CTA mis à jour.
- `src/contact/index.html` – formulaire mailto, WhatsApp `https://wa.me/33600000000`, Cal.com `https://cal.com/boostactivity/rdv`.
- `src/legal/mentions.html` & `src/legal/privacy.html` – placeholders `<!-- TODO: compléter -->` aux champs sensibles, nav accessible.
- `assets/css/main.css` & `assets/js/main.js` – nouveaux styles (tab. comparatif, footer) et JS sans préfixe absolu.
- `scripts/check-links.mjs` – vérification 404 internes sur `dist/`.

## Qualité & build
- `npm run lint:html`
- `npm run lint:css`
- `npm run build`
- `node scripts/check-links.mjs`
→ tous OK au 19/04/2025, 19:19.

## TODO / entrées à compléter
- Remplacer les visuels placeholders (`assets/img/logo-placeholder.svg`, `hero-placeholder.svg`, `og-image.png`, `favicon.png`) par les assets officiels.
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

## Notes complémentaires
- Les chemins relatifs sont compatibles Project Pages et environnement Lovable.
- Les cookies/tracking restent inactifs tant que le consentement n’est pas stocké (`boost-activity-consent`).
- Reportez-vous au README pour la procédure complète (palette, scripts, déploiement).
