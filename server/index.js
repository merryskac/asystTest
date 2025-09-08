const express = require("express");
const cors = require("cors");
const purchase = require("./model/purchase");
const passanger = require("./model/passanger");
const booking = require("./model/booking");
const Flight = require("./model/Flight");
const { responseJson } = require("./util/response");
const connectDB = require("./db/mongo");
const mongoose = require("mongoose");
const route = require("./route");

require("dotenv").config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", route);

// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello!" });
// });

// app.post("/api/booking/:id", async (req, res) => {
//   const data = req.body;
//   try {
//     const flight = await Flight.findById(req.params.id);

//     const purchaseData = new purchase({
//       title: data.title,
//       first_name: data.first_name,
//       last_name: data.last_name,
//       phone_number: data.phone_number,
//       email: data.email,
//       total: flight.price * data.passangers.length,
//       is_paid: true,
//     });

//     await purchaseData.save();
//     const passangerData = await passanger.insertMany(data.passangers);

//     const bookingData = await booking.insertOne({
//       flights: flight._id,
//       passangers: passangerData.map((p) => p._id),
//       purchases: purchaseData._id,
//       datetime: new Date(),
//       status: "pending",
//     });
//     responseJson(
//       res,
//       200,
//       { id: bookingData._id },
//       "Booking created successfully."
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating booking." });
//   }
// });

// app.get("/api/booking/:id", async (req, res) => {
//   try {
//     const bookingData = await booking
//       .findById(req.params.id)
//       .populate("flights")
//       .populate("passangers")
//       .populate("purchases");
//     if (!bookingData) {
//       return responseJson(res, 404, null, "Booking not found.");
//     }
//     responseJson(res, 200, bookingData, "Booking fetched successfully.");
//   } catch (error) {
//     console.error(error);
//     responseJson(res, 500, null, "Error fetching flights.");
//   }
// });

// app.get("/api/flights", async (req, res) => {
//   try {
//     const { from, to, departureDate, returnDate } = req.query;

//     // Siapkan objek filter dinamis
//     let filter = {};

//     if (from) {
//       filter.from = { $regex: from, $options: "i" }; // Case-insensitive
//     }

//     if (to) {
//       filter.to = { $regex: to, $options: "i" };
//     }

//     if (departureDate) {
//       // Gunakan awal dan akhir hari sebagai range
//       const start = new Date(departureDate);
//       start.setHours(0, 0, 0, 0);
//       const end = new Date(departureDate);
//       end.setHours(23, 59, 59, 999);
//       filter.datetime = { $gte: start, $lte: end };
//     }

//     // Jika juga ingin mengatur returnDate sebagai filter sekunder
//     if (returnDate) {
//       const start = new Date(returnDate);
//       start.setHours(0, 0, 0, 0);
//       const end = new Date(returnDate);
//       end.setHours(23, 59, 59, 999);
//       // Gabungkan filter datetime jika keduanya dipakai
//       filter.datetime = {
//         ...filter.datetime,
//         $lte: end,
//         $gte: filter.datetime?.$gte || start,
//       };
//     }

//     const flights = await Flight.find(filter).sort({ datetime: 1 });

//     responseJson(res, 200, flights, "Flights fetched successfully.");
//   } catch (error) {
//     console.error(error);
//     responseJson(res, 500, null, "Error fetching flights.");
//   }
// });

// app.get("/api/flights/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const flights = await Flight.find({ _id: id });

//     responseJson(res, 200, flights[0], "Flights fetched successfully.");
//   } catch (error) {
//     console.error(error);
//     responseJson(res, 500, null, "Error fetching flights.");
//   }
// });

app.use((req, res, next) => {
  responseJson(res, 404, null, "Route not found.");
});

app.listen(PORT, () => {
  console.log(`Server running`);
});
