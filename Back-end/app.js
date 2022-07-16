//Import de Express, BodyParser, Mongoose, Dotenv et Path
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const path = require ('path');
const dotenv = require('dotenv');
dotenv.config();

//Import des routeurs
const userRoutes = require ('./Routes/R_User');
const postRoutes = require ('./Routes/R_Post');

//Création application express
const app = express();

//Utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();
const userIdentifiant = process.env.userIdentifiant;
const userPassword =process.env.userPassword;

//Connection à la base de données MongoDB
mongoose.connect('mongodb+srv://'+ userIdentifiant + ':' + userPassword +'@clusterp7.eed3bkp.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

//Middleware général pour dire au navigateur de pouvoir utiliser l'API depuis n'importe où
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Middleware qui permet de parser les requêtes envoyées par le client, on peut y accéder grâce à req.body
//Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use ('/Images', express.static(path.join(__dirname, 'Images')));
app.use ('/api/users', userRoutes); 
app.use ('/api/posts', postRoutes);

//Export du module
module.exports = app;
