// Impot de Express, des middlewares et des controllers pour les posts
const express = require('express');
const router = express.Router();
const auth = require ('../Middlewares/auth');
const multer = require ('../Middlewares/multer-config');
const postCtrl = require ('../Controllers/C_Post');

//Gestion des posts
router.get ('/', auth, postCtrl.getAllPosts);
router.get ('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost); 
router.post('/:id/like', auth, postCtrl.likeDislike);
router.put('/:id', auth, multer, postCtrl.editPost);
router.delete('/:id', auth, postCtrl.deletePost);

//Gestion des commentaires
router.post('/:id/comment', auth, postCtrl.createComment);
router.post('/:id/comment/delete', auth, postCtrl.deleteComment);

// Export du routeur
module.exports = router;
