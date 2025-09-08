const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  flights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
  passangers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passanger",
    },
  ],
  purchases: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase",
  },

  datetime: Date,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
