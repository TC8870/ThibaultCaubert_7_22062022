## Process création
- Créer un repo Git via Gitkraken
- Créer la base de données sur MongoDB
- Création .env
- Création gitignore

## Partie Back-end
- Démarrer projet Node (npm init)
- Installer Express (npm install express)
- Installer Mongoose (npm install mongoose)
- Installer Mongoose unique validator (npm install mongoose-unique-validator)
- Installer Bcrypt (npm install bcrypt)
- Installer Multer (npm install multer --save)
- Installer jsonwebtoken (npm install jsonwebtoken)
- Installer nodemon server (npm install nodemon -g)
- Installer dote env (npm install dotenv --save)
- Installer Jwt-Decode pour lire le token (npm install jwt-decode)
- Créer et paramétrer server.js
- Créer app.js et paramétrer l'accès à la base de données MongoDB
- Mettre en place le middleware Auth
- Mettre en place le middleware Multer
- Créer et agencer Models User
- Créer et agencer Models Post/Comments
- Créer et paramétrer Routes User
- Créer et paramétrer Routes Post/Comments
- Créer et paramétrer Controllers User
- Créer et paramétrer Controllers Post/Comments
- Tester l'API 

## Partie Front-end
- Installer Vue (npm install -g vue-cli)
- Démarrer un projet Vue qui crée un dossier VueApp (vue init webpack VueApp)
- Installer axios pour permettre les requetes HTTP à l'API (npm install axios)
- Installer Vue-axios (npm install vue-axios)
- Installer Form-data pour axios (npm install --save form-data)
- Installer vue-Jwt-Decode pour lire le token (npm install vue-jwt-decode)
- Créer Header, Nav et Footer sur le HTML (partie statique)
- Créer un modèle HTML&CSS : accueil
- Créer un modèle HTML&CSS : signup
- Créer un modèle HTML&CSS : signupOK
- Créer un modèle HTML&CSS : login 
- Créer un modèle HTML&CSS : modifier son compte
- Créer un modèle HTML&CSS : créer un post
- Créer un modèle HTML&CSS : modifier un post
- Créer un modèle HTML&CSS : liste des posts
- Travailler le responsive : Point 1 - 1020 px / Point 2 - 500 px
- Paramétrer la page signup (qui envoie par la suite sur la page de connexion)
- Paramétrer la page signupOK (qui s'affiche lors de la bonne création du compte)
- Paramétrer la page login et affecter l'id, le token et le nom + prénom en localstorage
- Paramétrer la page de modification du compte
- Paramétrer la page de création de post
- Paramétrer la page de consultation des posts (like, dislike, edit delete ou comment d'un post)
- Paramétrer la page de modification de post

## En cours de codage ##
*** Partie finale ***
- Créer le ppt
- Créer les archives
- Nettoyer la BDD
- Supprimer les images du dossier

## Message envoyé à Mewena ##
-	Bugs restants 

> Lors de la suppression de commentaires avec plusieurs UserID dans les comments, cela supprime le mauvais commentaire (pas cool) mais en plus, il me supprime TOUS les commentaires de mon actuel user….
> J’ai l’impression que l’image doit être obligatoirement insérer lors de la création de post…. 

-	Reste à réaliser
> Modification de post, encore quelques ajustements à prévoir
> Lors d’un Signup, je n’ai pas encore fait la vérification si l’adresse mail existe déjà…. A corriger donc…
> Tu me confirmes le besoin de devoir supprimer mon compte utilisateur ? et que cela supprime également tous les posts du user ?
> Dans la liste des évolutions, voici mes idées à dates (que tu m’avais conseillé) :
> Modification du mot de passe
> Date de mise à jour du post lors d’un update
> Modification de commentaire
> Date de mise à jour d’un commentaire lors d’un update
> Création du PPT
