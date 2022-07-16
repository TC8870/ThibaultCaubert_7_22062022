// Import de Mongoose et de unique-validator
const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

//Création du schéma "User"
const userSchema = mongoose.Schema ({
    email : {type : String, required : true, unique :true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Format email invalide"]},
    password : {type : String, required : true },
    name : {type : String, required : true },
    lastname : {type : String, required : true },
    departement : {type : String, required : true },
    isAdministrator : {type : Boolean, required : true, value : false },
    })

//Associer le validateur unique au schéma
    userSchema.plugin(uniqueValidator)

//Export du schéma
module.exports = mongoose.model('User', userSchema);
