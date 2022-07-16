## Projet 7 OpenClassRoom
## Caractéristiques du projet
Auteur : TC8870
Objectif : construire le réseau social de l'entreprise Groupomania pour leurs employées afin d'améliorer l'ambiance au travail

Ce projet a été codé avec VSCode, en utilisant Node.JS avec le framework Vue.JS
La base de données est gérée via MongoDB
La session utilisateur est programmée pour durer 12h maximum (durée d'une journée de travail) afin de sécuriser l'accès à la session

Les extensions utilisées dans ce projet sont :
    >>> Express : pour pouvoir créer l'API et le routage
    >>> Mongoose (+ unique validator) : permet de manipuler les données dans la base de données MongoDB
    >>> Bcrypt : pour crypter les mots de passes et données sensibles
    >>> Multer : pour permettre la gestion des fichiers
    >>> Jsonwebtoken : pour avoir une méthode sécurisée d'échange d'informations sensibles
    >>> Jwt-Decode : pour pouvoir lire les données d'un token
    >>> Nodemon Server : pour pouvoir lancer les scripts node
    >>> Vue-Router : pour faire la distinction des URL des différentes "pages"
    >>> Axios : pour pouvour créer des requêtes HTTP
    >>> Form-Data : pour pouvoir réaliser une requête "form" et non un classique format Json

## Prérequis
- Pour installer l'application
    > Installer Node.js
    > Installer Vue.js
## Mode d'emploi
- Pour lancer l'application (version developpeur): 
    > Se rendre sur "Front-end/VueApp"
    > Lancer "npm run dev"
    > L'application doit se lancer sur le port indiqué dans la console (http://localhost:8080)
    *** Notes ***
    - Un utilisateur Administrateur a été créé pour Groupomania
    > Ses identifiants sont disponibles dans le fichier texte à part

- Pour lancer le Back-end
    > Se rendre sur "Back-end"
    > Lancer "nodemon server"
    *** Notes ***
    Pour gérer la base de données, se rendre sur la base de données MongoDB :
    > Lien : https://cloud.mongodb.com/v2/62beb8b72e6b8b0049e896f0#clusters
    > Les identifiants sont disponibles dans le fichier texte à part
