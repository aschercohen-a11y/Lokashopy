# Historique de Session Claude - Lokashopy

## Date : 28 Janvier 2026

---

## Projet : Lokashopy (anciennement BoothFinder)

Plateforme de mise en relation pour la location de photobooths en France.

**URL de production :** https://lokashopy.vercel.app/

**Repository GitHub :** https://github.com/aschercohen-a11y/Lokashopy

---

## Travail effectue durant cette session

### 1. Correction des images sur la page recherche

**Probleme :** Les images des prestataires ne s'affichaient pas sur la page de recherche.

**Cause identifiee :**
- Le CSS avait `opacity: 0` pour `img[loading="lazy"]`
- La fonction `Utils.lazyLoadImages()` n'etait appelee qu'au chargement initial, pas apres la navigation SPA

**Solution :**
- Ajout de `Utils.lazyLoadImages()` a la fin de la fonction `navigate()` dans `js/app.js`
- Cela permet d'attacher les event listeners aux nouvelles images apres chaque navigation

**Fichier modifie :** `js/app.js` (ligne ~121)

---

### 2. Deploiement sur Vercel

**Etapes realisees :**

1. **Initialisation Git**
   ```bash
   git init
   git config user.name "aschercohen-a11y"
   git config user.email "aschercohen@gmail.com"
   ```

2. **Creation du .gitignore**
   - node_modules/
   - .DS_Store, Thumbs.db
   - .vscode/, .idea/
   - .claude/
   - *.log

3. **Premier commit**
   ```bash
   git add -A
   git commit -m "Initial commit - BoothFinder photobooth rental portal"
   ```

4. **Connexion a GitHub**
   - Repository cree : `Lokashopy`
   - Remote ajoute : `https://github.com/aschercohen-a11y/Lokashopy.git`
   ```bash
   git remote add origin https://github.com/aschercohen-a11y/Lokashopy.git
   git branch -M main
   git push -u origin main
   ```

5. **Deploiement Vercel**
   - Compte Vercel cree (via GitHub)
   - Import du repository Lokashopy
   - Deploiement automatique configure

---

### 3. Renommage BoothFinder -> Lokashopy

**Fichiers modifies :**
- `index.html` : meta tags, titre, favicon (B -> L), URLs
- `js/app.js` : references BoothFinder
- `js/components.js` : logo "Booth<span>Finder</span>" -> "Loka<span>shopy</span>"
- `js/data.js` : commentaires et references

**Commit :**
```bash
git commit -m "Rename BoothFinder to Lokashopy"
git push
```

Vercel a automatiquement redeploy le site.

---

## Architecture du projet

```
Lokashopy/
├── index.html              # Point d'entree HTML
├── css/
│   ├── variables.css       # Variables CSS (couleurs, espacements)
│   ├── base.css            # Styles de base, reset
│   ├── components.css      # Composants reutilisables
│   ├── pages.css           # Styles specifiques aux pages
│   └── responsive.css      # Media queries
├── js/
│   ├── data.js             # Donnees des prestataires (mock)
│   ├── utils.js            # Fonctions utilitaires
│   ├── components.js       # Composants HTML (header, footer, cards, dashboard)
│   ├── supabase-config.js  # Configuration Supabase + services Auth/Database/Storage
│   └── app.js              # Application principale, routing SPA, auth state
├── .gitignore
└── CLAUDE.md               # Ce fichier
```

---

## Stack technique

- **Frontend :** HTML5, CSS3, JavaScript (Vanilla)
- **Backend :** Supabase (Authentication, PostgreSQL, Storage)
- **Routing :** SPA avec History API
- **Hebergement :** Vercel (gratuit)
- **Repository :** GitHub
- **Deploiement :** Automatique via Git push

---

## Fonctionnalites

- Page d'accueil avec recherche et prestataires vedettes
- Page de recherche avec filtres (type, budget, options, note)
- Pages profil prestataire avec galerie, avis, equipements
- Formulaire d'inscription prestataire
- Design responsive (mobile, tablet, desktop)
- Lazy loading des images
- **Authentification** (inscription/connexion email/mot de passe)
- **Dashboard prestataire** :
  - Vue d'ensemble avec statistiques
  - Gestion du profil (infos, logo, contact)
  - Gestion des photobooths (CRUD)
  - Gestion des tarifs (formules, options)
  - Galerie photos (upload, suppression)
  - Consultation des avis

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

---

## Configuration Supabase (IMPORTANT)

### Etape 1 : Creer un projet Supabase

1. Allez sur https://supabase.com
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub (recommande) ou email
4. Cliquez "New project"
5. Choisissez une organisation et nommez le projet (ex: "lokashopy")
6. Choisissez un mot de passe pour la base de donnees
7. Selectionnez la region (ex: West EU - Paris)
8. Cliquez "Create new project" et attendez ~2 minutes

### Etape 2 : Creer la table providers

1. Dans le menu gauche, cliquez "Table Editor"
2. Cliquez "Create a new table"
3. Nom de la table : `providers`
4. Decochez "Enable Row Level Security" (on l'activera apres)
5. Ajoutez les colonnes suivantes :

| Nom | Type | Options |
|-----|------|---------|
| id | uuid | Primary Key, Default: auth.uid() |
| name | text | |
| slug | text | |
| description | text | Nullable |
| logo_url | text | Nullable |
| verified | bool | Default: false |
| email | text | |
| city | text | Nullable |
| department | text | Nullable |
| address | text | Nullable |
| postal_code | text | Nullable |
| phone | text | Nullable |
| website | text | Nullable |
| instagram | text | Nullable |
| facebook | text | Nullable |
| booths | jsonb | Default: '[]' |
| pricing_formulas | jsonb | Default: '[]' |
| pricing_extras | jsonb | Default: '[]' |
| gallery | jsonb | Default: '[]' |
| views | int4 | Default: 0 |
| quotes | int4 | Default: 0 |
| favorites | int4 | Default: 0 |
| plan | text | Default: 'free' |
| created_at | timestamptz | Default: now() |
| updated_at | timestamptz | Default: now() |

6. Cliquez "Save"

### Etape 3 : Configurer Row Level Security (RLS)

1. Allez dans "Authentication" > "Policies"
2. Trouvez la table `providers` et cliquez dessus
3. Activez RLS avec le bouton
4. Ajoutez ces politiques :

**Politique SELECT (lecture publique) :**
- Name: `Public read access`
- Target roles: public
- USING expression: `true`

**Politique INSERT (creation par l'utilisateur) :**
- Name: `Users can create their own profile`
- Target roles: authenticated
- WITH CHECK expression: `auth.uid() = id`

**Politique UPDATE (modification par le proprietaire) :**
- Name: `Users can update their own profile`
- Target roles: authenticated
- USING expression: `auth.uid() = id`
- WITH CHECK expression: `auth.uid() = id`

### Etape 4 : Creer le bucket Storage

1. Menu gauche > "Storage"
2. Cliquez "Create a new bucket"
3. Nom : `provider-images`
4. Cochez "Public bucket"
5. Cliquez "Create bucket"

6. Cliquez sur le bucket cree puis "Policies"
7. Ajoutez ces politiques :

**SELECT (lecture publique) :**
```sql
bucket_id = 'provider-images'
```

**INSERT (upload par le proprietaire) :**
```sql
bucket_id = 'provider-images' AND auth.uid()::text = (storage.foldername(name))[1]
```

**DELETE (suppression par le proprietaire) :**
```sql
bucket_id = 'provider-images' AND auth.uid()::text = (storage.foldername(name))[1]
```

### Etape 5 : Recuperer les cles API

1. Menu gauche > "Project Settings" (icone engrenage)
2. Cliquez sur "API"
3. Copiez :
   - **Project URL** (commence par https://xxx.supabase.co)
   - **anon public** key (longue chaine de caracteres)

### Etape 6 : Mettre a jour le fichier de config

Ouvrez `js/supabase-config.js` et remplacez les valeurs :

```javascript
const SUPABASE_URL = 'https://votre-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'votre-anon-key-ici';
```

### Test de l'authentification

1. Lancez le site en local : `npx serve -p 8000`
2. Cliquez sur "Inscription" dans le header
3. Selectionnez "Prestataire"
4. Remplissez le formulaire
5. Verifiez votre email (Supabase envoie un email de confirmation)
6. Connectez-vous et accedez au dashboard

### Note importante

Par defaut, Supabase requiert la confirmation d'email. Pour desactiver en dev :
1. "Authentication" > "Providers" > "Email"
2. Decochez "Confirm email"

---

## Prochaines etapes possibles

- [ ] Ajouter un domaine personnalise (ex: lokashopy.fr)
- [x] ~~Implementer un vrai backend (API, base de donnees)~~ - Supabase
- [x] ~~Ajouter l'authentification utilisateurs~~ - Supabase Auth
- [ ] Systeme de messagerie entre clients et prestataires
- [ ] Paiement en ligne pour les reservations
- [x] ~~Tableau de bord prestataire~~ - Implemente

---

## Notes

- Le plan Vercel gratuit suffit pour commencer
- Pour usage commercial, passer au plan Pro (20$/mois)
- Les images utilisent placehold.co (placeholders), a remplacer par de vraies photos

---

*Session Claude Code avec Claude Opus 4.5*
