const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema ({

    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
     country: {
        type: String,
        required: true
    },
     city: {
        type: String,
        required: true
    },
     phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    img: {
        type: String
    }
 },{ timestamps: true });

 userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id: this.id, isAdmin: this.isAdmin}, process.env.PRIVATE_KEY)
    return token
 }

 const User = mongoose.model("User", userSchema );

 function validation (user) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        phone: Joi.string().required(),
        img: Joi.string()
    });
   return schema.validate(user)
 }

 module.exports.User = User;
 module.exports.validate = validation;

