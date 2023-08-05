const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: String,
  availableSeat: Number,
  price: Number,
  amenities: [String]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
