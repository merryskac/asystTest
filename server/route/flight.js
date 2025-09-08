const express = require("express");
const { getFlights, getFlightById } = require("../controller/flight");
const { responseJson } = require("../util/response");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const flights = await getFlights(req);

    responseJson(res, 200, flights, "Flights fetched successfully.");
  } catch (error) {
    console.error(error);
    responseJson(res, 500, null, "Error fetching flights.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const flights = await getFlightById(req);

    responseJson(res, 200, flights, "Flights fetched successfully.");
  } catch (error) {
    console.error(error);
    responseJson(res, 500, null, "Error fetching flights.");
  }
});

module.exports = router;
