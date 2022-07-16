// Importer le modèle User
// Importer les outils Bcrypt, JsonWebtoken et Dote pour la configuration de sécurité
const User = require("../Models/M_User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Emplacement de la clé TOKEN et du timing d'expiration
const KEY_TOKEN = process.env.KEY_TOKEN;
const EXPIRE_TIME = process.env.EXPIRE_TIME;

// Créer un compte utilisateur ********************************************************************************
exports.signup = (req, res, next) => {
  bcrypt
    // 10 passages sur le mot de passe
    .hash(req.body.password, 10) 
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        lastname: req.body.lastname,
        departement: req.body.departement,
        isAdministrator: req.body.isAdministrator,
      });
      user
        .save()
        .then(() =>
          res
            .status(201)
            .json({ message: "Votre compte Groupomania a été créé" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Se connecter à un compte utilisateur *************************************************************************
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
    // Si utilisateur non trouvé
      if (!user) {
        return res
          .status(401)
          .json({ error: "utilisateur/mot de passe incorrect" });
      }
    // Si utilisateur trouvé
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
        // Si mot de passe/utilisateur invalide
          if (!valid) {
            return res
              .status(401)
              .json({ error: "utilisateur/mot de passe incorrect" });
          }
          // Si mot de passe/utilisateur valide - création du jeton TOKEN
          res.status(200).json({
            token: jwt.sign(
              {
                email: user.email,
                password: user.password,
                userId: user.id,
                name: user.name,
                lastname: user.lastname,
                departement: user.departement,
                userCompleteName: user.name + " " + user.lastname,
                admin: user.isAdministrator,
              },
              KEY_TOKEN,
              { expiresIn: EXPIRE_TIME }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modifier son compte utilisateur *************************************************************************
exports.editProfile = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
    // Si utilisateur non trouvé
      if (!user) {
        return res
          .status(401)
          .json({ error: "utilisateur/mot de passe incorrect" });
      }
    // Si utilisateur trouvé
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
        // Si mot de passe/utilisateur invalide
          if (!valid) {
            return res
              .status(401)
              .json({ error: "utilisateur/mot de passe incorrect" });
          } else {
        // Si mot de passe/utilisateur valide  mise à jour des champs User
            bcrypt
              .hash(req.body.password, 10)
              .then((hash) =>
                User.updateOne(
                  { _id: req.params.id },
                  {
                    _id: req.params.id,
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    departement: req.body.departement,
                    isAdministrator: req.body.isAdministrator,
                  }
                )
              )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Votre compte Groupomania a été modifié" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Consulter un utilisateur **************************************************************************************************
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

// Consulter tous les utilisateurs *************************************************************************************************
exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      if (users.length > null) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ error: "Aucun user à afficher" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer son compte utilisateur *************************************************************************************************
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
    // Si utilisateur non trouvé
      if (!user) {
        res.status(404).json({ erreur: new Error("Utilisateur non trouvé") });
    // Si utilisateur trouvé mais ne correspond pas à l'utilisateur actuel
      } else if (req.params.id !== req.auth.userId) {
        res.status(401).json({ erreur: new Error("Requête non autorisée") });
    // Si c'est le bon utilisateur
      } else {
        User.deleteOne({ _id: req.params.id })
          .then(() =>
            res
              .status(200)
              .json({ message: "Votre compte Groupomania a été supprimé" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
