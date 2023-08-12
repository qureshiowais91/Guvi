const Room = require('./schema/room');
const Booking = require('./schema/booking');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://owais91:Star123war@cluster0.oofrtyb.mongodb.net/HotelBookingAPP'
);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
// create a Room
app.post('/create/room', async (req, res, next) => {
  try {
    await Room.insertMany(req.body);
    res.status(200).json({ Data: 'New Room Added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: 'Internal Server Error' });
  }
});
// start and end time counted as hr 
app.post('/book/room', async (req, res, next) => {
  try {
    const { customerName, bookingDate, StartTime, EndTime, RoomID } = req.body;
    const date= new Date(bookingDate);
    console.log(date)
    const getBooking = await Booking.find({ bookingDate, RoomID });
    if (getBooking.length > 0) {
      res.status(200).json({ message: 'Room Booked For Same Date',getBooking});
    } else {
      const t = await Booking.insertMany([
        { customerName, bookingDate, StartTime, EndTime, RoomID },
      ]);

      res.status(200).json({ Data: 'Room Booked', t });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: 'Internal Server Error' });
  }
});
// list all room with booking detail
app.get('/list/booked/room', async (req, res, next) => {
  try {
    const resp = await Booking.find({}).populate('RoomID', 'name');
    res.status(200).json({ Data: 'Room Booked', resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: 'Internal Server Error' });
  }
});
//list all customer with booking details
app.get('/list/allcustomer/booked', async (req, res, next) => {
  try {
    const resp = await Booking.find({});
    res.status(200).json({ Data: 'Customer Booking Detail', resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: 'Internal Server Error' });
  }
});
// list a customer with booking details
app.get('/list/customer/booked', async (req, res, next) => {
  try {
    const { customerName } = req.body;
    const resp = await Booking.find({ customerName }).populate(
      'RoomID',
      'name'
    );
    if (resp.length) {
      res.status(200).json({ Message: 'Customer Booking Detail', resp });
    } else {
      res.status(200).json({ Message: 'No Booking Detail Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
