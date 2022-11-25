const { User } = require('../models/Users');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/asyncMiddleware');
const verifyToken = require('../middleware/verifyToken');

router.get('/', asyncMiddleware(async (req, res)=> {

    const user = await User.find().sort('name');

    if(!user) return res.status(404).send("OOPS! there is no users in database")
    
    res.json(user)
    
}));

router.get('/:id',  asyncMiddleware(async (req, res)=> {

    const user = await User.findById(req.params.id).select('-password -updatedAt');

    if(!user) return res.status(404).send("OOPS! Data Seems To Be Empty.")
    
    res.json(user)
}));

router.put('/:id', verifyToken,  asyncMiddleware(async (req, res)=> {
    
    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },
    { new: true }
    )

    if(!user.id) return res.status(404).send("User with given Id not found.")
    
    res.status(200).json(user);
}));

router.delete('/:id', asyncMiddleware(async (req, res)=> {

     const user = await User.findByIdAndRemove(req.params.id)

    if(!user.id) return res.status(404).send("User with given Id not found.") 
    
    res.status(200).json("User has been deleted.");
}));




module.exports = router;