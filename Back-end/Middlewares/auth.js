// Import de jwt et de la clé TOKEN
// iddleware appliqué à toutes les routes afin de les sécuriser
const jwt = require('jsonwebtoken');
const KEY_TOKEN = process.env.KEY_TOKEN;

module.exports = (req, res, next) => {
  try {
    //Rcupération du token (2e élément du tableau (car split bearer))
    const token = req.headers.authorization.split(" ")[1];
    // On vérifie le token décodé avec la clé TOKEN
    const decodedToken = jwt.verify(token, KEY_TOKEN);
    // On vérifie que le userId envoyé avec la requête correspond au userId encodé dans le token
    const userId = decodedToken.userId;
    //Test de l'userID
    req.auth = { userId };
    // si tout est valide on passe au prochain middleware
    next();
  } catch (error) {
    // sinon probleme d'autentification
    console.log(error);
    res.status(401).json({ error: error | "401: unauthorized request !" });
  }
};
