const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  customerName: String,
  bookingStatus: String,
  bookingDate: {type: Date},
  StartTime: { type: Date },
  EndTime: { type: Date },
  RoomID: { type: mongoose.Types.ObjectId, ref: 'Room' },
});

const booking = mongoose.model('Booking', bookingSchema);
module.exports = booking;
