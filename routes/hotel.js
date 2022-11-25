const { Hotels } = require('../models/Hotels');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/asyncMiddleware')
const { Rooms } = require('../models/Rooms')


router.get('/cityCount', asyncMiddleware(async (req, res)=> {

    const cities = req.query.cities.split(',');
    
    const list = await Promise.all(cities.map((city)=> {
        return Hotels.countDocuments({city})
    }))
    
    res.json(list)
}));

router.get('/typeCount', asyncMiddleware(async (req, res)=> {
    
    const hotelCount = await Hotels.countDocuments({ type: "hotel" });
    const aparmentCount = await Hotels.countDocuments({ type: "apartment" });
    const resortCount = await Hotels.countDocuments({ type: "resort" });
    const cabinCount = await Hotels.countDocuments({ type: "cabin" });
    const villaCount = await Hotels.countDocuments({ type: "villa" });
    
    res.json([
        {type: "hotel", count: hotelCount },
        {type: "apartment", count: aparmentCount },
        {type: "resort", count: resortCount },
        {type: "cabin", count: cabinCount },
        {type: "villa", count: villaCount },
    ])
}));

router.get('/', asyncMiddleware(async (req, res)=> {

    const { min, max, ...others } = req.query;

    const hotel = await Hotels.find(
        {...others, 
        price: {$gt: min | 1, $lt: max || 999} 
        })
        .sort('name').limit(req.query.limit);
    
    res.json(hotel)
}));

router.get('/find/:id', asyncMiddleware(async (req, res)=> {

    const hotel = await Hotels.findById(req.params.id);

    if(!hotel) return res.status(404).send("User with given Id not found.")
    
    res.json(hotel)
}));

router.get('/room/:id', asyncMiddleware(async (req, res)=> {

    const hotel = await Hotels.findById(req.params.id);
    // console.log(hotel);
    if(!hotel) return res.status(404).send("User with given Id not found.")

    const list = await Promise.all(hotel.rooms.map(room =>{
        return Rooms.findById(room)
    }))
    
    res.json(list)
}));

router.post('/', asyncMiddleware (async (req,res)=> {
    // const { error } = validate(req.body)
    // if (error) return res.status(400).send(error.details[0].message);

    const hotel = new Hotels (req.body)

    if(!hotel) return res.status(400).send("Invalid Detail")

    const result = await hotel.save();

    res.json(result);
}));

router.put('/:id', asyncMiddleware( async (req, res)=> {
    
    const hotel = await Hotels.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },
    { new: true }
    )

    if(!hotel.id) return res.status(404).send("User with given Id not found.")
    
    res.status(200).json(hotel);
}));

router.delete('/:id', asyncMiddleware( async (req, res)=> {

    const hotel = await Hotels.findByIdAndRemove(req.params.id)

    if(!hotel.id) return res.status(404).send("User with given Id not found.")    
    
    res.status(200).json(hotel);
}));

module.exports = router;

