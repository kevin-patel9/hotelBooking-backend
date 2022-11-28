const bcrypt = require('bcrypt')
const _ = require('lodash')
const Joi = require('joi')
const { User, validate } = require('../models/Users')
const mongoose = require('mongoose');
const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const router = express.Router();

router.post('/register', asyncMiddleware (async (req,res)=> {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let user =  await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.")

  user = new User (_.pick(req.body, ['username','email', 'password', 'isAdmin', 'country', 'city', 'phone', 'img']));

 const salt = await bcrypt.genSalt(10);
 user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.cookie('x_access_token', token).json("New User Created");
}));

router.post('/login', asyncMiddleware(async (req, res) => {
    const { error } = validates(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

   let user =  await User.findOne({ email: req.body.email })
   if (!user) return res.status(400).send("Invalid email or password.")

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) res.status(400).send("Invalid email or password.")

  //  const token = user.generateAuthToken();

    res.json(_.pick(user, ['username', 'email', 'isAdmin']));
}));

function validates(auth) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required(),
      password: Joi.string().min(5).max(1024).required()
    });
  
    return schema.validate(auth)
  }
  

module.exports = router;