const mongoose = require("mongoose");

const passangerSchema = new mongoose.Schema({
  title: String,
  first_name: String,
  last_name: String,
  dob: Date,
  nationality: String,
});

module.exports = mongoose.model("Passanger", passangerSchema);
