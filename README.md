# 🦁 Quiz U13 FC Sochaux — Guide de déploiement sur Vercel

Ce guide te permet de mettre ton quiz en ligne en **environ 20 minutes**, gratuitement, avec un vrai lien que tu pourras partager à ton équipe.

---

## ✅ Ce que tu obtiens à la fin

- Un vrai lien web type `quiz-sochaux.vercel.app` que tes joueurs ouvrent sur leur téléphone
- Une **base de données partagée** qui stocke la progression de tous les joueurs
- Un **classement en direct** visible par tous (joueurs et coach)
- Les joueurs peuvent **installer l'app sur leur téléphone** (icône sur l'écran d'accueil)
- **100 % gratuit** tant que tu restes sous 10 000 commandes/jour (largement suffisant pour une équipe)

---

## 📋 Étape 1 : Créer un compte GitHub (5 min)

GitHub est l'outil qui va héberger ton code source.

1. Va sur **https://github.com**
2. Clique sur **"Sign up"** et crée un compte gratuit (email + mot de passe)
3. Vérifie ton email

---

## 📋 Étape 2 : Mettre le code sur GitHub (5 min)

### Option A : Avec GitHub Desktop (le plus simple, recommandé)

1. Télécharge **GitHub Desktop** : https://desktop.github.com/
2. Installe-le et connecte-toi avec ton compte GitHub
3. Dans GitHub Desktop : **File → New repository**
   - Name : `quiz-sochaux-u13`
   - Local path : choisis un dossier sur ton ordinateur
   - Coche "Initialize this repository with a README"
   - Clique **Create repository**
4. Ouvre le dossier créé dans ton explorateur de fichiers
5. **Copie TOUS les fichiers du dossier `quiz-vercel/`** que je t'ai fourni à l'intérieur
6. Retour dans GitHub Desktop : tu verras tous les fichiers listés
7. En bas à gauche, écris un message (ex : "Premier upload") puis clique **Commit to main**
8. Clique **Publish repository** en haut → décoche "Keep this code private" (ou laisse coché si tu veux) → **Publish**

### Option B : Avec l'interface web GitHub (sans installer de logiciel)

1. Sur github.com, clique **+** en haut à droite → **New repository**
2. Name : `quiz-sochaux-u13`, public → **Create repository**
3. Sur la page du repo, clique **uploading an existing file**
4. Glisse-dépose tous les fichiers du dossier `quiz-vercel/`
5. En bas, clique **Commit changes**

---

## 📋 Étape 3 : Créer un compte Vercel (2 min)

1. Va sur **https://vercel.com**
2. Clique **"Sign Up"**
3. Choisis **"Continue with GitHub"** (le plus simple — tu réutilises ton compte GitHub)
4. Autorise Vercel à accéder à GitHub

---

## 📋 Étape 4 : Déployer le projet (3 min)

1. Sur le dashboard Vercel, clique **"Add New..."** → **"Project"**
2. Tu vois la liste de tes dépôts GitHub. Trouve `quiz-sochaux-u13` et clique **"Import"**
3. **NE CLIQUE PAS ENCORE SUR DEPLOY !** On doit d'abord ajouter la base de données.
4. Laisse cette page ouverte et passe à l'étape suivante.

---

## 📋 Étape 5 : Créer la base de données (5 min)

C'est là que sera stockée la progression de chaque joueur et le classement partagé.

1. Ouvre un nouvel onglet sur **https://vercel.com/dashboard**
2. Clique sur l'onglet **"Storage"** dans le menu de gauche
3. Clique **"Create Database"**
4. Choisis **"Upstash"** → **"KV"** (ou "Redis")
5. Donne un nom : `quiz-sochaux-db` → région **fra1 (Paris)** → **Create**
6. Une fois créée, clique sur l'onglet **"Connect Project"** ou **".env.local"** :
7. Note précieusement les deux variables :
   - `KV_REST_API_URL` (ou `UPSTASH_REDIS_REST_URL`)
   - `KV_REST_API_TOKEN` (ou `UPSTASH_REDIS_REST_TOKEN`)

8. Clique sur **"Connect"** et sélectionne ton projet `quiz-sochaux-u13` → les variables seront automatiquement liées.

---

## 📋 Étape 6 : Configurer les variables d'environnement

Si Vercel ne les a pas liées automatiquement :

1. Retour sur le projet `quiz-sochaux-u13` dans Vercel
2. **Settings** (en haut) → **Environment Variables**
3. Ajoute ces deux variables (les noms exacts) :
   - `UPSTASH_REDIS_REST_URL` = l'URL que Upstash t'a donné
   - `UPSTASH_REDIS_REST_TOKEN` = le token que Upstash t'a donné
4. Coche **Production**, **Preview** et **Development**
5. **Save**

---

## 📋 Étape 7 : Lancer le déploiement (2 min)

1. Retour sur la page du projet
2. Onglet **"Deployments"** en haut
3. Clique sur les **3 points** du dernier déploiement → **"Redeploy"** (pour qu'il prenne en compte les variables d'environnement)
4. Attends 2 minutes que le déploiement se termine
5. 🎉 **C'EST EN LIGNE !**

Ton URL ressemble à : `https://quiz-sochaux-u13.vercel.app`

---

## 📋 Étape 8 : Personnaliser l'URL (optionnel, 2 min)

Pour avoir une URL plus simple à retenir :

1. Sur le projet Vercel → **Settings** → **Domains**
2. Ajoute par exemple : `quiz-fcsm-u13.vercel.app` ou tout ce qui est disponible

---

## 📱 Étape 9 : Partager avec ton équipe

Envoie le lien aux parents et joueurs avec ce message :

> 🦁 **Quiz officiel U13 des Lionceaux pour Capbreton 2026-2027 !**
>
> 👉 [TON_LIEN_VERCEL]
>
> **Comment ça marche :**
> 1. Ouvre le lien sur ton téléphone
> 2. Tape ton prénom
> 3. Passe les 7 niveaux (il faut 7/10 minimum pour débloquer le suivant)
> 4. Tu peux voir le classement de toute l'équipe en direct !
>
> 💡 **Astuce iPhone** : Ouvre le lien dans Safari → bouton "Partager" → "Sur l'écran d'accueil" pour avoir l'app comme une vraie appli !
>
> 💡 **Astuce Android** : Ouvre dans Chrome → menu (3 points) → "Ajouter à l'écran d'accueil"

---

## 🔧 Dépannage

### "Le classement reste vide même avec des joueurs"
→ Vérifie que les variables d'environnement Upstash sont bien configurées dans Vercel (Settings → Environment Variables), et **redéploie** après modification.

### "La progression ne se sauvegarde pas"
→ Même cause : variables d'environnement manquantes. Vérifie aussi dans Vercel "Functions" → "Logs" s'il y a des erreurs.

### "Le lien ne marche pas pour mes joueurs"
→ Le lien doit commencer par `https://` et finir par `.vercel.app`. Teste-le toi-même d'abord en navigation privée pour t'assurer qu'il fonctionne sans ton compte connecté.

### "Comment modifier les questions ou les couleurs ?"
→ Modifie le fichier `app/page.jsx` directement sur GitHub (clique sur le fichier → icône crayon "Edit"). À chaque modification, Vercel redéploie automatiquement en ~1 minute.

---

## 💰 Coût

**Vraiment 0 €** pour ton usage. Les limites du plan gratuit :
- **Vercel** : 100 GB de bande passante/mois, 100 000 invocations de fonctions/mois → largement assez pour une équipe de 20 joueurs
- **Upstash Redis** : 10 000 commandes/jour, 256 MB de stockage → largement assez

Si tu dépasses un jour, Vercel et Upstash mettront simplement ton service en pause pour ce mois, sans frais cachés.

---

## 🎁 Bonus : Mode coach

Tu peux toi-même jouer en tapant ton prénom (ex: "Coach Maxime") et apparaître dans le classement. Ou tu peux juste utiliser l'écran "Classement" sur grand écran pendant l'entraînement pour montrer la progression de toute l'équipe en direct !

---

Bon Capbreton les Lionceaux ! 🦁⚽
