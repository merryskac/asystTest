import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
  Input,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Flights() {
  const navigate = useNavigate();

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();

    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (departureDate) params.append("departureDate", departureDate);
    if (returnDate) params.append("returnDate", returnDate);

    fetch(`${import.meta.env.VITE_BASE_API}/api/flights?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setFlights(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching flights:", err);
        setLoading(false);
      });
  }, [from, to, departureDate, returnDate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-12 w-12" />
      </div>
    );

  return (
    <div className="p-6">
      <Typography
        variant="h5"
        color="blue-gray"
        className="mb-3 text-cyan-600 font-semibold"
      >
        Cari Penerbangan
      </Typography>

      <Card className="p-6 mb-8 shadow-lg border-blue-gray-100">
        <Typography variant="h4" className="mb-3 text-cyan-600 font-semibold">
          Filter Penerbangan
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
              <i className="fas fa-plane-departure text-blue-500" />
              Dari
            </label>
            <input
              type="text"
              placeholder="Contoh: Jakarta"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
              <i className="fas fa-plane-arrival text-green-500" />
              Tujuan
            </label>
            <input
              type="text"
              placeholder="Contoh: Bali"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
              <i className="fas fa-calendar-alt text-indigo-500" />
              Tanggal Berangkat
            </label>
            <input
              type="date"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
              <i className="fas fa-calendar-check text-purple-500" />
              Tanggal Pulang
            </label>
            <input
              type="date"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setFrom("");
              setTo("");
              setDepartureDate("");
              setReturnDate("");
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
          >
            Reset Filter
          </button>
        </div>
      </Card>

      {flights.length === 0 ? (
        <Typography color="gray">Tidak ada penerbangan ditemukan.</Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map((flight) => (
            <Card
              key={flight._id}
              onClick={() => navigate(`/booking/${flight._id}`)}
              className="shadow-lg border border-gray-300 rounded-2xl hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <CardBody>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  {flight.from} ({flight.airport_from}) → {flight.to} (
                  {flight.airport_to})
                </Typography>
                <Typography color="gray" className="mb-1">
                  {flight.airline} — {flight.flight_number}
                </Typography>
                <Typography color="gray" className="mb-1">
                  {new Date(flight.datetime).toLocaleString()}
                </Typography>
                <Typography color="gray" className="mb-1">
                  Durasi: {flight.duration} menit
                </Typography>
                <Typography color="green" className="font-semibold">
                  Rp {flight.price.toLocaleString()}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 mt-auto flex justify-end">
                <Button
                  size="sm"
                  color="blue"
                  className="bg-cyan-600"
                  onClick={() => navigate(`/booking/${flight._id}`)}
                >
                  Choose
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
