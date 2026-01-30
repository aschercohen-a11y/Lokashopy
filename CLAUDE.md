# Historique de Session Claude - Lokashopy

## Date : 30 Janvier 2026

---

## Projet : Lokashopy (anciennement BoothFinder)

Plateforme de mise en relation pour la location de photobooths en France.

**URL de production :** https://lokashopy.vercel.app/

**Repository GitHub :** https://github.com/aschercohen-a11y/Lokashopy

---

## Sessions precedentes (28-29 Janvier 2026)

### 28 Janvier 2026
- Correction des images sur la page recherche (lazy loading)
- Deploiement sur Vercel
- Renommage BoothFinder -> Lokashopy

### 29 Janvier 2026
- Integration complete de Supabase (Auth, Database, Storage)
- Correction de nombreux bugs (voir historique complet plus bas)
- Suppression des faux prestataires
- Header simplifie pour le dashboard

---

## Session actuelle (30 Janvier 2026)

### 1. Champ "Rayon d'intervention"

**Fonctionnalite :** Permettre aux prestataires d'indiquer leur zone d'intervention

- Ajout du champ `radius` dans le profil dashboard
- Option de laisser vide pour masquer l'information
- Affichage conditionnel sur la page publique

**Colonnes Supabase ajoutees :**
```sql
ALTER TABLE providers ADD COLUMN IF NOT EXISTS radius int4;
```

### 2. Liens vers avis externes (Google & Trustpilot)

**Fonctionnalite :** Afficher les avis Google My Business et Trustpilot

- Champs URL pour Google et Trustpilot dans le dashboard
- Champs manuels pour note (ex: 4.8/5) et nombre d'avis
- Affichage en cartes cliquables sur l'onglet "Avis"
- Etoiles jaunes et indication "/5"

**Colonnes Supabase a ajouter :**
```sql
ALTER TABLE providers
ADD COLUMN IF NOT EXISTS google_reviews_url text,
ADD COLUMN IF NOT EXISTS trustpilot_url text,
ADD COLUMN IF NOT EXISTS google_rating decimal(2,1),
ADD COLUMN IF NOT EXISTS google_review_count int4,
ADD COLUMN IF NOT EXISTS trustpilot_rating decimal(2,1),
ADD COLUMN IF NOT EXISTS trustpilot_review_count int4;
```

### 3. Reorganisation de l'onglet Avis

- Titre "Avis sur Lokashopy" au-dessus de la note 5.0
- Section "Nos avis exterieurs" pour Google/Trustpilot
- Suppression du "(0)" dans l'onglet "Avis"

### 4. Amelioration des onglets (tabs)

- Taille augmentee (font + padding)
- Effet hover en fondu : fond rose + texte blanc
- Transition 0.3s ease

### 5. Recadrage d'image pour photobooths

**Librairie ajoutee :** Cropper.js

- Modal de recadrage lors de l'ajout de photo
- Ratio 4:3 pour les images de photobooth
- Zoom, deplacement, recadrage avant upload
- Export en JPEG qualite 0.9

**CDN ajoutes dans index.html :**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"></script>
```

### 6. Sous-onglets pour photobooths

**Fonctionnalite :** Navigation entre plusieurs photobooths

- Si 1 seul photobooth : affichage direct sans sous-onglets
- Si plusieurs : titre "Nos choix de photobooth" + sous-onglets
- Boutons avec nom de chaque photobooth
- Effet hover rose/blanc comme les onglets principaux

---

## Architecture du projet

```
Lokashopy/
├── index.html              # Point d'entree HTML + CDN Cropper.js
├── css/
│   ├── variables.css       # Variables CSS (couleurs, espacements)
│   ├── base.css            # Styles de base, reset
│   ├── components.css      # Composants (modal, tabs, crop-modal)
│   ├── pages.css           # Styles pages (booths-subtabs, external-reviews)
│   └── responsive.css      # Media queries
├── js/
│   ├── data.js             # Donnees mock + OPTIONS
│   ├── utils.js            # Fonctions utilitaires
│   ├── components.js       # Composants HTML (renderBoothModal avec crop)
│   ├── supabase-config.js  # Services Auth/Database/Storage
│   └── app.js              # App principale (setupBoothSubtabs, cropper)
├── .gitignore
└── CLAUDE.md               # Ce fichier
```

---

## Stack technique

- **Frontend :** HTML5, CSS3, JavaScript (Vanilla)
- **Backend :** Supabase (Authentication, PostgreSQL, Storage)
- **Librairies :** Cropper.js (recadrage images)
- **Routing :** SPA avec History API
- **Hebergement :** Vercel (gratuit)
- **Repository :** GitHub
- **Deploiement :** Automatique via Git push

---

## Fonctionnalites implementees

- Page d'accueil avec recherche et prestataires vedettes
- Page de recherche avec filtres (type, budget, options, note)
- Pages profil prestataire avec galerie, avis, equipements
- Design responsive (mobile, tablet, desktop)
- Lazy loading des images
- **Authentification email/mot de passe**
- **Dashboard prestataire complet :**
  - Vue d'ensemble avec statistiques
  - Gestion du profil (infos, logo, contact, reseaux sociaux)
  - Champs experience, evenements/an, rayon d'intervention
  - Liens Google Reviews et Trustpilot avec notes manuelles
  - Gestion des photobooths avec recadrage d'image
  - Gestion des tarifs (formules et options)
  - Galerie photos (upload, suppression)
- **Page prestataire publique :**
  - Onglets avec effet hover
  - Sous-onglets pour photobooths multiples
  - Avis Lokashopy + avis externes (Google/Trustpilot)

---

## Configuration Supabase

### Structure de la table providers

| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid | Cle primaire, = auth.uid() |
| name | text | Nom de l'entreprise |
| slug | text | URL-friendly identifier |
| description | text | Description longue |
| logo_url | text | URL du logo |
| verified | bool | Prestataire verifie |
| email, phone | text | Contact |
| city, department, address, postal_code | text | Localisation |
| website, instagram, facebook | text | Liens |
| experience | int4 | Annees d'experience |
| events_per_year | int4 | Nombre d'evenements par an |
| radius | int4 | Rayon d'intervention (km) |
| google_reviews_url | text | Lien Google My Business |
| google_rating | decimal(2,1) | Note Google (ex: 4.8) |
| google_review_count | int4 | Nombre d'avis Google |
| trustpilot_url | text | Lien Trustpilot |
| trustpilot_rating | decimal(2,1) | Note Trustpilot |
| trustpilot_review_count | int4 | Nombre d'avis Trustpilot |
| booths | jsonb | Liste des photobooths |
| pricing_formulas | jsonb | Formules tarifaires |
| pricing_extras | jsonb | Options supplementaires |
| gallery | jsonb | URLs des photos |
| views, quotes, favorites | int4 | Statistiques |
| plan | text | Plan (free, pro, etc.) |
| created_at, updated_at | timestamptz | Timestamps |

### Policies RLS actives

- **SELECT :** Public (tous peuvent lire)
- **INSERT :** Authenticated, si `auth.uid() = id`
- **UPDATE :** Authenticated, si `auth.uid() = id`

### Policies Storage

- **SELECT :** Public sur `provider-images`
- **INSERT/DELETE :** Proprietaire du dossier (`auth.uid() = folder`)

---

## Commandes utiles

### Modifier et deployer
```bash
cd "C:\Users\asche\Downloads\claude\Comparateur"
git add -A
git commit -m "Description des changements"
git push
```
Vercel deploie automatiquement en ~30 secondes.

### Lancer en local
```bash
npx serve -p 8000
```
Puis ouvrir http://localhost:8000/

### SQL pour nouvelles colonnes
```sql
ALTER TABLE providers
ADD COLUMN IF NOT EXISTS radius int4,
ADD COLUMN IF NOT EXISTS google_reviews_url text,
ADD COLUMN IF NOT EXISTS trustpilot_url text,
ADD COLUMN IF NOT EXISTS google_rating decimal(2,1),
ADD COLUMN IF NOT EXISTS google_review_count int4,
ADD COLUMN IF NOT EXISTS trustpilot_rating decimal(2,1),
ADD COLUMN IF NOT EXISTS trustpilot_review_count int4;
```

---

## Prestataire de test

**Nom :** ShootnBox
**Dashboard :** https://lokashopy.vercel.app/dashboard
**Page publique :** https://lokashopy.vercel.app/prestataire/shootnbox

---

## Prochaines etapes possibles

- [ ] Ajouter un domaine personnalise (ex: lokashopy.fr)
- [ ] Systeme de messagerie entre clients et prestataires
- [ ] Paiement en ligne pour les reservations
- [ ] Systeme de notation/avis par les clients sur Lokashopy
- [ ] Notifications par email (nouvelles demandes de devis)
- [ ] Page "Mes favoris" pour les clients
- [ ] Scraping automatique des notes Google (API payante)

---

## Notes importantes

- Le plan Vercel gratuit suffit pour commencer
- Le plan Supabase gratuit inclut : 500MB database, 1GB storage, 50K auth users
- Pour usage commercial, prevoir Supabase Pro (25$/mois) + Vercel Pro (20$/mois)
- Cropper.js est charge via CDN (pas d'installation npm necessaire)

---

*Session Claude Code avec Claude Opus 4.5 - 30 Janvier 2026*
