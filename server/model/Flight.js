const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  datetime: Date,
  airline: String,
  airport_from: String,
  airport_to: String,
  capacity: Number,
  flight_number: String,
  duration: Number,
  price: Number,
});

module.exports = mongoose.model("Flight", flightSchema);
