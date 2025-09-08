const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  phone_number: String,
  email: String,
  total: String,
  is_paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
