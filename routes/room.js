const express = require('express');
const router = express.Router();
const { Rooms } = require('../models/Rooms')
const { Hotels } = require('../models/Hotels');
const asyncMiddleware = require('../middleware/asyncMiddleware');

router.get('/', asyncMiddleware( async (req,res)=> {
    const room = await Rooms.find().sort('name');

    res.json(room);
}));

router.post('/:hotelid', asyncMiddleware( async (req,res)=> {

    const hotelId = req.params.hotelid;
    
    const room = new Rooms(req.body)
    const savedRoom = await room.save();
    
    const hotel = await Hotels.findByIdAndUpdate(hotelId, { 
        $push: {rooms: savedRoom._id } 
    }, {new: true});
    
    res.json(hotel)
}));

router.put('/:id', asyncMiddleware( async (req, res)=> {
    
    const room = await Rooms.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },
    { new: true }
    )

    if(!room.id) return res.status(404).send("User with given Id not found.")
    
    res.status(200).json(room);
}));

router.put('/availability/:id', asyncMiddleware( async (req, res)=> {
    
    const room = await Rooms.updateOne(
        { "roomNumbers._id": req.params.id },
        {
            $push: {
                "roomNumbers.$.bookedRoom": req.body.dates
            },
        }
        );

    if(!room) return res.status(404).send("Room with given Id not found.");

      res.status(200).json("Room status has been updated.");
}));

router.delete('/:id/:hotelid', asyncMiddleware( async (req, res)=> {
    
    const hotelId = req.params.hotelid;
    const room = await Rooms.findByIdAndRemove(req.params.id)

    const hotel = await Hotels.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id } 
    })

    if(!room) return res.status(404).send("Room with given Id not found.")    
    if(!hotel) return res.status(404).send("Hotel with given Id not found.")    
    
    res.status(200).json('Room has been deleted.');
}));

module.exports = router;