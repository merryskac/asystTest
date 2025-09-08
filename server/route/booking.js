const express = require("express");
const router = express.Router({ mergeParams: true });
const purchase = require("../model/purchase");
const { createBooking, getBookingById } = require("../controller/booking");
const { responseJson } = require("../util/response");

router.post("/:id", async (req, res) => {
  try {
    const bookingData = await createBooking(req);

    responseJson(res, 200, bookingData, "Booking created successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookingData = await getBookingById(req);
    if (!bookingData) {
      return responseJson(res, 404, null, "Booking not found.");
    }
    responseJson(res, 200, bookingData, "Booking fetched successfully.");
  } catch (error) {
    console.error(error);
    responseJson(res, 500, null, "Error fetching flights.");
  }
});

module.exports = router;
