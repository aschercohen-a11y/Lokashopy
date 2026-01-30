# Lokashopy - Checklist du Projet

## Legende
- [x] = Termine
- [ ] = A faire

---

## 1. INFRASTRUCTURE & DEPLOIEMENT

- [x] Initialisation du projet
- [x] Repository GitHub
- [x] Deploiement Vercel (automatique)
- [x] Configuration Supabase (Auth, Database, Storage)
- [ ] Domaine personnalise (lokashopy.fr)
- [ ] Certificat SSL (automatique avec Vercel)
- [ ] Configuration DNS

---

## 2. AUTHENTIFICATION

- [x] Inscription prestataire (email/mot de passe)
- [x] Connexion
- [x] Deconnexion
- [x] Gestion de session
- [ ] Inscription client (visiteurs)
- [ ] Mot de passe oublie (email de reset)
- [ ] Connexion Google OAuth
- [ ] Connexion Facebook OAuth
- [ ] Verification email

---

## 3. DASHBOARD PRESTATAIRE

### Profil
- [x] Nom de l'entreprise
- [x] Description
- [x] Logo (upload)
- [x] Adresse, ville, code postal, departement
- [x] Telephone, site web
- [x] Reseaux sociaux (Instagram, Facebook)
- [x] Annees d'experience
- [x] Evenements par an
- [x] Rayon d'intervention (optionnel)
- [x] Lien Google My Business
- [x] Lien Trustpilot
- [x] Note Google (manuelle)
- [x] Nombre d'avis Google (manuel)
- [x] Note Trustpilot (manuelle)
- [x] Nombre d'avis Trustpilot (manuel)

### Equipements (Photobooths)
- [x] Ajouter un photobooth
- [x] Modifier un photobooth
- [x] Supprimer un photobooth
- [x] Photo avec recadrage (Cropper.js)
- [x] Nom, type, prix de base
- [x] Description, caracteristiques
- [x] Options incluses (avec quantite pour impressions)

### Tarifs
- [x] Formules tarifaires (nom, duree, prix, inclus)
- [x] Options supplementaires (nom, prix)
- [ ] Tarifs par type d'evenement
- [ ] Tarifs saisonniers

### Galerie
- [x] Upload de photos
- [x] Suppression de photos
- [ ] Reordonner les photos (drag & drop)
- [ ] Legendes/descriptions des photos

### Statistiques
- [x] Vues du profil
- [x] Demandes de devis
- [x] Favoris
- [ ] Graphiques d'evolution
- [ ] Export des statistiques

---

## 4. PAGE PRESTATAIRE PUBLIQUE

### Header
- [x] Banniere/Cover image
- [x] Logo
- [x] Nom, localisation
- [x] Note moyenne
- [x] Badge verifie
- [x] Bouton favoris
- [x] Bouton demander un devis

### Onglets
- [x] Presentation (description, expertise, zone)
- [x] Photobooths (sous-onglets si plusieurs)
- [x] Galerie (lightbox)
- [x] Avis (Lokashopy + externes Google/Trustpilot)
- [x] Tarifs

### Interactions
- [x] Effet hover sur onglets (rose/blanc)
- [x] Lightbox pour images
- [ ] Formulaire de contact rapide fonctionnel
- [ ] Partage sur reseaux sociaux

---

## 5. PAGE D'ACCUEIL

- [x] Hero avec recherche
- [x] Barre de recherche (ville, type evenement)
- [x] Statistiques animees
- [x] Prestataires vedettes (depuis Supabase)
- [x] Temoignages clients
- [x] Section "Devenir prestataire"
- [ ] Slider/carrousel de prestataires
- [ ] Categories populaires

---

## 6. PAGE RECHERCHE

- [x] Liste des prestataires
- [x] Filtres (type, budget, options, note)
- [x] Filtre par localisation
- [x] Cartes prestataires cliquables
- [ ] Tri (prix, note, distance)
- [ ] Pagination ou infinite scroll
- [ ] Carte geographique
- [ ] Recherche par mot-cle

---

## 7. SYSTEME D'AVIS

### Avis Lokashopy (internes)
- [x] Affichage des avis
- [x] Note moyenne et repartition
- [ ] Formulaire pour laisser un avis (clients)
- [ ] Moderation des avis (admin)
- [ ] Reponse du prestataire aux avis

### Avis externes
- [x] Lien Google My Business
- [x] Lien Trustpilot
- [x] Affichage note et nombre d'avis (manuel)
- [ ] Scraping automatique des notes (API payante)

---

## 8. SYSTEME DE DEVIS

- [ ] Formulaire de demande de devis
- [ ] Envoi par email au prestataire
- [ ] Historique des demandes (dashboard)
- [ ] Statut des demandes (en attente, accepte, refuse)
- [ ] Notification nouvelle demande

---

## 9. SYSTEME DE FAVORIS

- [x] Bouton favoris sur carte prestataire
- [x] Bouton favoris sur page prestataire
- [ ] Page "Mes favoris" (compte client)
- [ ] Persistance des favoris (base de donnees)

---

## 10. MESSAGERIE / CHAT

- [ ] Interface de conversation
- [ ] Envoi de messages texte
- [ ] Envoi de fichiers/images
- [ ] Historique des conversations
- [ ] Indicateur "en ligne"
- [ ] Indicateur "message lu"
- [ ] Notifications en temps reel (Supabase Realtime)

---

## 11. NOTIFICATIONS

### Web
- [ ] Notifications navigateur (Web Push)
- [ ] Centre de notifications dans l'app
- [ ] Badge non-lu

### Email
- [ ] Nouvelle demande de devis
- [ ] Nouveau message
- [ ] Nouvel avis
- [ ] Rappels et alertes

### Mobile (futur Flutter)
- [ ] Push notifications iOS
- [ ] Push notifications Android

---

## 12. ADMINISTRATION

- [ ] Dashboard admin
- [ ] Gestion des prestataires (valider, suspendre)
- [ ] Gestion des utilisateurs
- [ ] Moderation des avis
- [ ] Statistiques globales
- [ ] Gestion des abonnements/plans

---

## 13. MONETISATION

- [ ] Plans prestataires (Free, Pro, Premium)
- [ ] Paiement Stripe
- [ ] Factures automatiques
- [ ] Mise en avant payante
- [ ] Commission sur devis (optionnel)

---

## 14. SEO & MARKETING

- [x] Meta tags (title, description)
- [x] Open Graph (partage social)
- [x] Schema.org (JSON-LD)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Google Analytics
- [ ] Google Search Console
- [ ] Blog / Articles SEO

---

## 15. RESPONSIVE & ACCESSIBILITE

- [x] Design mobile
- [x] Design tablet
- [x] Design desktop
- [ ] Tests accessibilite (WCAG)
- [ ] Navigation clavier
- [ ] Lecteur d'ecran

---

## 16. APPLICATION MOBILE (FUTUR)

- [ ] Developpement Flutter
- [ ] Interface iOS
- [ ] Interface Android
- [ ] Push notifications natives
- [ ] Chat temps reel
- [ ] Publication App Store
- [ ] Publication Play Store

---

## RESUME

| Categorie | Termine | A faire |
|-----------|---------|---------|
| Infrastructure | 4/7 | 3 |
| Authentification | 4/9 | 5 |
| Dashboard | 20/24 | 4 |
| Page prestataire | 12/14 | 2 |
| Page accueil | 6/8 | 2 |
| Page recherche | 5/9 | 4 |
| Avis | 6/11 | 5 |
| Devis | 0/5 | 5 |
| Favoris | 2/4 | 2 |
| Messagerie | 0/7 | 7 |
| Notifications | 0/8 | 8 |
| Administration | 0/6 | 6 |
| Monetisation | 0/5 | 5 |
| SEO | 3/8 | 5 |
| Accessibilite | 3/5 | 2 |
| App Mobile | 0/7 | 7 |

**Total : ~65 taches terminees / ~72 taches restantes**

---

*Derniere mise a jour : 30 Janvier 2026*
