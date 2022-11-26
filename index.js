const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const hotels = require('./routes/hotel');
const users = require('./routes/user');
const rooms = require('./routes/room');
require('dotenv').config()
const auth = require('./routes/auth');
const path = require('path')

app.use(cors({
  origin: "*"
}))
app.use(cookieParser())

mongoose.connect(process.env.SERVER_IP)
    .then(()=> console.log('Connected to Database'))
    .catch(()=> console.log('Not Connected to Database'))

app.use(express.json())

app.use('/auth', auth )
app.use('/hotel', hotels )
app.use('/user', users )
app.use('/room', rooms )
app.use(function(err, req, res, next){

    res.status(500).send("Something Failed");
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const port = process.env.PORT || 9000;

app.listen(port, ()=> console.log(`Listining to port ${port}`))