const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const hotels = require("./routes/hotel");
const users = require("./routes/user");
const rooms = require("./routes/room");
require("dotenv").config();
const auth = require("./routes/auth");

app.use(cors());
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
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 9000, () =>
  console.log(`Listining to port port`)
);
