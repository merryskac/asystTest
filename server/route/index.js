const express = require("express");
const router = express.Router();

const flight = require("./flight");
const booking = require("./booking");

router.use("/flights", flight);
router.use("/booking", booking);

module.exports = router;
