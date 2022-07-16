## Plan de test et structure de l'API
## Identifiants ##
Administrateur
    "email": "admin@groupomania.fr",
    "password": "Azerty1!",
User 1
    "email": "user1@groupomania.fr",
    "password": "123456",
User 2
    "email": "user2@groupomania.fr",
    "password": "123456",

## 01-Créer un utilisateur
POST - api/users/signup
{    
    "email": "test1@moi.fr",
    "password": "123",
    "name" : "essainom",
    "lastname" : "essaiprenom",
    "departement" : "RH",
    "isAdministrator" : false
}
Réponse attendue : Votre compte Groupomania a été créé

## 02-Se connecter en tant qu'utilisateur
POST - api/users/login
{    
    "email": "test1@moi.fr",
    "password": "123"
}
Réponse attendue : id + token + nom et prénom

## 03-Modifier son compte utilisateur
Requis : token d'identification
PUT - api/users/:id (remplacer :id par le id user)
{    
    "email": "test1@moi.fr",
    "password": "123",
    "name" : "essainom",
    "lastname" : "essaiprenom",
    "departement" : "Informatique",
    "isAdministrator" : false
}
Réponse attendue : Votre compte Groupomania a été modifié

## 04-Consulter tous les utilisateurs
Requis : token d'identification
GET - api/users
Réponse attendue : liste des utilisateurs

## 05-Consulter un utilisateur
Requis : token d'identification
GET - api/users/:id (remplacer :id par le id user)
Réponse attendue : liste de utilisateur dont l'id correspond

## 06-Supprimer un utilisateur
Requis : token d'identification
DELETE - api/users/:id (remplacer :id par le id user) 
Réponse attendue : Votre compte Groupomania a été supprimé

## 07-Créer un post 
Requis : token d'identification + Id
POST - api/posts/
dans body-forms renseigner : 
form fields : post : { "userId" : "mettre id utilisateur", "date" : "01/01/2000", "userName" : "nomtest", "title" : "montitre", "description" :"madescription", "likes" : 0, "dislikes" : 0, "usersLiked" : [], "usersDisliked" : [], "comments" : [], "commentUSerNames" : [], "commentDates" : [], "commentDescriptions" : []} 
dans image : lien url
Réponse attendue : Votre post a été créé

## 08-Modifier un post 
Requis : token d'identification
PUT - api/posts/:id (remplacer :id par l'id du post) 
dans body-forms renseigner : 
post : { "userId" : "mettre id utilisateur", "date" : "01/01/2000", "userName" : "nomtest", "title" : "montitre", "description" :"madescription", "likes" : 0, "dislikes" : 0, "usersLiked" : [], "usersDisliked" : [], "comments" : [], "commentUSerNames" : [], "commentDates" : [], "commentDescriptions" : []} 
dans image : lien url
Réponse attendue : Votre post a été modifié

## 09-Consulter tous les posts
Requis : token d'identification
GET - api/posts
Réponse attendue : liste de tous les posts

## 10-Consulter un post
Requis : token d'identification
GET - api/posts/:id (remplacer :id par l'id du post)
Réponse attendue : post dont l'id correspond

## 11-Supprimer un post
Requis : token d'identification
DELETE - api/posts/:id (remplacer :id par l'id du post)
Réponse attendue : Votre post a été supprimé

## 12-Liker/disliker un post
Requis : token d'identification
POST - api/posts/:id (remplacer :id par l'id du post)/like
{    
    "userId" : "id",
    "like" : 1
}
Réponse attendue : 
    - Si 1 renseigné : Like ajouté
    - Si 1 renseigné une seconde fois : Post déja liké
    - Si -1 renseigné : Dislike ajouté
    - Si -1 renseigné une seconde fois : Post déja disliké
    - Si 0 renseigné : Like retiré / Dislike retiré

## 13-Créer un commentaire  
Requis : token d'identification
POST - api/posts/:id (remplacer :id par l'id du post)/comment
{    
    "commentUSerNames" : "Denis",
    "commentDates" : "01/01/2000",
    "commentDescriptions" : "mon commentaire"
}
Réponse attendue : Votre commentaire a été créé

## 14-Supprimer un commentaire  
Requis : token d'identification
POST - api/posts/:id (remplacer :id par l'id du post)/comment/delete
{    
    "commentUSerNames" : "Denis",
    "commentDates" : "01/01/2000",
    "commentDescriptions" : "mon commentaire"
}
Réponse attendue : Votre commentaire a été supprimé
