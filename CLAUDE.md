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
├── index.html          # Point d'entree HTML
├── css/
│   ├── variables.css   # Variables CSS (couleurs, espacements)
│   ├── base.css        # Styles de base, reset
│   ├── components.css  # Composants reutilisables
│   ├── pages.css       # Styles specifiques aux pages
│   └── responsive.css  # Media queries
├── js/
│   ├── data.js         # Donnees des prestataires (mock)
│   ├── utils.js        # Fonctions utilitaires
│   ├── components.js   # Composants HTML (header, footer, cards)
│   └── app.js          # Application principale, routing SPA
├── .gitignore
└── CLAUDE.md           # Ce fichier
```

---

## Stack technique

- **Frontend :** HTML5, CSS3, JavaScript (Vanilla)
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

## Prochaines etapes possibles

- [ ] Ajouter un domaine personnalise (ex: lokashopy.fr)
- [ ] Implementer un vrai backend (API, base de donnees)
- [ ] Ajouter l'authentification utilisateurs
- [ ] Systeme de messagerie entre clients et prestataires
- [ ] Paiement en ligne pour les reservations
- [ ] Tableau de bord prestataire

---

## Notes

- Le plan Vercel gratuit suffit pour commencer
- Pour usage commercial, passer au plan Pro (20$/mois)
- Les images utilisent placehold.co (placeholders), a remplacer par de vraies photos

---

*Session Claude Code avec Claude Opus 4.5*
