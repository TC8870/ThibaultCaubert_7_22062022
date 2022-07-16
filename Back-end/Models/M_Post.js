// Import de Mongoose
const mongoose = require ('mongoose');

//Création du schéma "Post"
const postSchema = mongoose.Schema ({
    // Post
    userId : {type : String, required : true },
    date : {type : String, required : true },
    userName : {type : String, required : true },
    title : {type : String, required : true },
    description : {type : String, required : true },
    imageUrl : {type : String, required : false },
    likes : {type: Number, required: false, value : 0},
    dislikes : {type: Number, required: false, value : 0},
    usersLiked : [String],
    usersDisliked : [String],
    //Commentaires - inclus directement dans le post
    commentUserNames : [String],
    commentDates : [String],
    commentDescriptions : [String]
    });

//Export du schéma
module.exports = mongoose.model('Post', postSchema);
