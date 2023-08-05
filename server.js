
const Room = require("./schema/room");
const Booking = require("./schema/booking");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { mongoose } = require("mongoose");

mongoose.connect(
  "mongodb+srv://owais91:K7vJe7hN3AnHmkwo@cluster0.oofrtyb.mongodb.net/HotelBookingAPP"
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());

app.post("/create/room", async (req, res, next) => {
  const { name, availableSeat, price, amenities } = req.body;
  console.log(Room);
  await Room.insertMany([{ name, availableSeat, price, amenities }]);
  res.status(200).json({ Data: "New Room Added" });
});

app.post("/book/room", async (req, res, next) => {
  const { customerName, Date, StartTime, EndTime, RoomID } = req.body;
  const t = await Booking.insertMany([
    { customerName, Date, StartTime, EndTime, RoomID },
  ]);

  res.status(200).json({ Data: "room Booked", t });
});

app.get("/list/booked/room", async (req, res, next) => {
  const resp = await Booking.find({}).populate('RoomID','name')
  console.log(resp);
  res.status(200).json({ Data: "room Booked",resp});
});

app.listen(3000, () => {
  console.log("done");
});
