const booking = require("../model/booking");
const Flight = require("../model/Flight");
const passanger = require("../model/passanger");

async function createBooking(req) {
  const data = req.body;
  const flight = await Flight.findById(req.params.id);

  const purchaseData = new purchase({
    title: data.title,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    email: data.email,
    total: flight.price * data.passangers.length,
    is_paid: true,
  });

  await purchaseData.save();
  const passangerData = await passanger.insertMany(data.passangers);

  const bookingData = await booking.insertOne({
    flights: flight._id,
    passangers: passangerData.map((p) => p._id),
    purchases: purchaseData._id,
    datetime: new Date(),
    status: "pending",
  });

  return {
    id: bookingData._id,
  };
}

async function getBookingById(req) {
  const bookingData = await booking
    .findById(req.params.id)
    .populate("flights")
    .populate("passangers")
    .populate("purchases");

  return bookingData || null;
}

module.exports = {
  createBooking,
  getBookingById,
};
