const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: String,
  BookingID: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
