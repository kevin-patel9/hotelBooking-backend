const mongoose = require('mongoose');
const Joi = require('joi');

const hotelSchema = new mongoose.Schema ({

    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photo: {
        type: [String]
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    rooms:{
        type: [String],
    },
    price: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
 });

 const Hotels = mongoose.model("Hotels", hotelSchema );

//  function validation (hotels) {
//     const schema = Joi.object({
//         name: Joi.string().required(),
//         type: Joi.string().required(),
//         city: Joi.string().required(),
//         address: Joi.string().required(),
//         distance: Joi.number().required(),
//         desc: Joi.string().required(),
//         price: Joi.number().required()
//     });
//    return schema.validate(hotels)
//  }

 module.exports.Hotels = Hotels;
//  module.exports.validate = validation;

