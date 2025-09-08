const Flight = require("../model/Flight");

async function getFlights(req) {
  const { from, to, departureDate, returnDate } = req.query;

  let filter = {};

  if (from) {
    filter.from = { $regex: from, $options: "i" }; // Case-insensitive
  }

  if (to) {
    filter.to = { $regex: to, $options: "i" };
  }

  if (departureDate) {
    const start = new Date(departureDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(departureDate);
    end.setHours(23, 59, 59, 999);
    filter.datetime = { $gte: start, $lte: end };
  }

  if (returnDate) {
    const start = new Date(returnDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(returnDate);
    end.setHours(23, 59, 59, 999);

    filter.datetime = {
      ...filter.datetime,
      $lte: end,
      $gte: filter.datetime?.$gte || start,
    };
  }

  const flights = await Flight.find(filter).sort({ datetime: 1 });

  return flights;
}

async function getFlightById(req) {
  const id = req.params.id;
  const flights = await Flight.find({ _id: id });

  return flights[0];
}

module.exports = {
  getFlights,
  getFlightById,
};
