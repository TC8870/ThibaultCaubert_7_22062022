// Import de multer pour gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

// Dictionnaire des types MIME pour le format des images autorisé
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// On crée un objet de configuration 
const storage = multer.diskStorage({
  // Création de la destination - ici le dossier images qu'on a créé dans le backend
  destination: (req, file, callback) => {
    callback(null, 'Images');},
  // Création du nom suppresion des espaces et underscores à la place   
  filename: (req, file, callback) => {
    let name = file.originalname.split(' ').join('_');
    let extension = MIME_TYPES[file.mimetype];
    name = name.replace("." + extension, "_");
    // On appelle le callback, null = pas d'erreur, ajout d'un timestamp,et l'extension du fichier
    callback(null, name + Date.now() + '.' + extension);
  }
});

// On export le module, on lui passe l'objet storage, la méthode single pour dire que c'est un fichier unique et on précise que c'est une image
module.exports = multer({storage: storage}).single('image');
