// Import du modèle
// Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
// Récupération de jwt_token pour gérer le decryptage des tokens
const Post = require("../Models/M_Post");
const fs = require("fs");
const jwt_decode = require("jwt-decode");
const { openStdin } = require("process");
const { db } = require("../Models/M_Post");

// PARTIE POSTS *****************************************************************************************************************
// Afficher tous les posts ******************************************************************************************************
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      if (posts.length > null) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "Aucun post à afficher" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// Afficher un post spécifique **************************************************************************************************
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// Créer un post ****************************************************************************************************************
exports.createPost = (req, res, next) => {
  myNewPost = req.body;
  // Trouver la date
  const fullDate = req.body.post.split(",")[1];
  const myDate = fullDate.split(":")[1];
  // Trouver le titre
  const fullTitle = req.body.post.split(",")[3];
  const myTitle = fullTitle.split(":")[1];
  // Trouver la description
  const fullDescription = req.body.post.split(",")[4];
  const myDescription = fullDescription.split(":")[1];
  // Décryptage du token
  const decryptedToken = jwt_decode(req.headers.authorization.split(" ")[1]);
  delete myNewPost._id;
  // Si présence Image
  if (req.file) {
    var myImageURL = `${req.protocol}://${req.get("host")}/Images/${req.file.filename}`
  } else {
    var myImageURL = ''}
  // Création du post - suppression des "" dans le cas de la date, du titre et de la description
  post = new Post({
    userId: decryptedToken.userId,
    date: myDate.replace(/"/g, ""),
    userName: decryptedToken.userCompleteName,
    title: myTitle.replace(/"/g, ""),
    description: myDescription.replace(/"/g, ""),
    imageUrl: myImageURL,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    commentUniqueId: [],
    commentUserId: [],
    commentUserNames: [],
    commentDates: [],
    commentDescriptions: [],
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Votre post a été créé" }))
    .catch((error) => res.status(400).json({ error }));
};

//Modifier un post *************************************************************************************************************
exports.editPost = (req, res, next) => {
  // Trouver la date
  const fullDate = req.body.post.split(",")[1];
  const myDate = fullDate.split(":")[1];
  // Trouver le titre
  const fullTitle = req.body.post.split(",")[3];
  const myTitle = fullTitle.split(":")[1];
  // Trouver la description
  const fullDescription = req.body.post.split(",")[4];
  const myDescription = fullDescription.split(":")[1];
  // Si présence Image
  if (req.file) {
    var myImageURL = `${req.protocol}://${req.get("host")}/Images/${req.file.filename}`
  }
  // Lancer la modification du post
  Post.findOne({ _id: req.params.id }).then((post) => {
    //Si Id ne correspond pas
    if (post.userId !== req.auth.userId) {
      res.status(403).json({ message: "Utilisateur non valide" });
    }
    //Si Id correspond
    else {
      Post.updateOne(
        { _id: req.params.id },
        {_id: req.params.id,
          userId : req.body.post.userId,
          date : myDate.replace(/"/g, ""),
          userName : req.body.post.userName,
          title : myTitle.replace(/"/g, ""),
          description : myDescription.replace(/"/g, ""),
          imageUrl: myImageURL,
          likes: post.likes,
          dislikes: post.dislikes,
          usersLiked: post.usersLiked,
          usersDisliked: post.usersDislike,
          commentUniqueId : post.commentUniqueId,
          commentUSerId: post.commentUSerId,
          commentUSerNames: post.commentUSerNames,
          commentDates: post.commentDates,
          commentDescriptions: post.commentDescriptions,
        }
      )
        .then(() =>
          res.status(201).json({ message: "Votre post a été modifié" })
        )
        .catch((error) => res.status(400).json({ error }));
    }
  });
};

//Supprimer un post ********************************************************************************************************
exports.deletePost = (req, res, next) => {
  // Test si Admin ou User correct - Décryptage token
  const decryptedToken = jwt_decode(req.headers.authorization.split(" ")[1]);
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        res.status(404).json({ erreur: new Error("Post non trouvé") });
      } else if (
        post.userId === req.auth.userId ||
        decryptedToken.admin === true
      ) {
        const filename = post.imageUrl.split("/Images/")[1];
        fs.unlink(`Images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({ message: "Votre post a été supprimé" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        res.status(401).json({ erreur: new Error("Requête non autorisée") });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//Liker ou disliker un post ****************************************************************************************************
exports.likeDislike = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      //Si like, contrôle si déjà liké, si ok alors ajout de l'ID utilisateur + compteur incrémenté de 1
      if (req.body.like === 1) {
        if (post.usersLiked.includes(req.body.userId)) {
          res.status(401).json({ error: "Post déja liké" });
        } else if (post.usersDisliked.includes(req.body.userId)) {
          res.status(401).json({ error: "Post déja disliké" });
        } else {
          Post.updateOne(
            { _id: req.params.id },
            {
              $push: { usersLiked: req.body.userId },
              $inc: { likes: req.body.like++ },
            }
          )
            .then(() => {
              res.status(201).json({ message: "Like ajouté !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      }
      //Si dislike, contrôle si déjà disliké, si ok alors ajout de l'ID utilisateur + compteur incrémenté de 1
      if (req.body.like === -1) {
        if (post.usersDisliked.includes(req.body.userId)) {
          res.status(401).json({ error: "post déja disliké" });
        } else if (post.usersLiked.includes(req.body.userId)) {
          res.status(401).json({ error: "Post déja liké" });
        } else {
          Post.updateOne(
            { _id: req.params.id },
            {
              $push: { usersDisliked: req.body.userId },
              $inc: { dislikes: req.body.like++ * -1 },
            }
          )
            .then(() => {
              res.status(201).json({ message: "Dislike ajouté !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      }
      //Sinon annuler like ou dislike
      else if (req.body.like === 0) {
        if (post.usersLiked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersLiked: req.body.userId },
              $inc: { likes: -1 },
            }
          )
            .then(() => res.status(201).json({ message: "Like retiré !" }))
            .catch((error) => res.status(400).json({ error }));
        } else if (post.usersDisliked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then(() => res.status(201).json({ message: "Dislike retiré !" }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          res.status(401).json({ error: "Aucun like/dislike à annuler" });
        }
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

// PARTIE COMMENTAIRES ****************************************************************************************************************
// Créer un commentaire ***************************************************************************************************************
exports.createComment = (req, res, next) => {
  Post.updateOne(
    { _id: req.params.id },
    {
      $push: {
        commentUniqueId : req.body.commentUniqueId,
        commentUserId : req.body.commentUserId,
        commentUserNames: req.body.commentUserNames,
        commentDates: req.body.commentDates,
        commentDescriptions: req.body.commentDescriptions,
      },
    }
  )
    .then(() => {
      res.status(201).json({ message: "Votre commentaire a été créé !" });
    })
    .catch((error) => res.status(400).json({ error }));
};

//Supprimer un commentaire ***********************************************************************************************************
exports.deleteComment = (req, res, next) => {
  // Numéro d'index
  const myIndexToDelete = req.body.index
  const MyArray = 
  console.log(myIndexToDelete)

  console.log(req.body),
  console.log(req.params)

  // En cours d'ajustement
  Post.updateOne(
    { _id: req.params.id },
    {
      $update: {
        commentUniqueId : '1',
        commentUserId : req.body.commentUserId,
        commentUserNames: req.body.commentUserNames,
        commentDates: req.body.commentDates,
        commentDescriptions: req.body.commentDescriptions,
      },
    }
    )
    .then(() =>
    console.log(commentUniqueId[req.body]),
      res.status(200).json({ message: "Votre commentaire a été supprimé" })
    )
    .catch((error) => res.status(400).json({ error }));
}
