const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const hotels = require("./routes/hotel");
const users = require("./routes/user");
const rooms = require("./routes/room");
require("dotenv").config();
const auth = require("./routes/auth");
const path = require('path');
const cors = require('cors');



app.use(cors({
  origin: "*"
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());

mongoose
  .connect(process.env.SERVER_IP)
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log("Not Connected to Database"));

app.use(express.json());

app.use("/auth", auth);
app.use("/hotels", hotels);
app.use("/users", users);
app.use("/rooms", rooms);
app.use(function (err, req, res, next) {
  res.status(500).send("Something Failed");
  next();
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 9000, () =>
  console.log(`Listining to port port`)
);
