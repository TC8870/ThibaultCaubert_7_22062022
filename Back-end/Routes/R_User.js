// Impot de Express, des middlewares et des controllers pour les users
const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');
const userCtrl = require ('../Controllers/C_User'); 

//Gestion des users
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser)
router.get('/', auth, userCtrl.getAllUsers)
router.put('/:id', auth, userCtrl.editProfile)
router.delete('/:id', auth, userCtrl.deleteUser)

// Export du routeur
module.exports = router;

