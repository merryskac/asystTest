import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  Spinner,
  Button,
} from "@material-tailwind/react";

export default function BookingSuccess() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_API}/api/booking/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBooking(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching booking:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center mt-20">
        <Typography variant="h5" color="red">
          Booking not found.
        </Typography>
      </div>
    );
  }

  const flight = booking.flights[0];
  const purchase = booking.purchases;

  return (
    <div className="xl:max-w-4xl mx-auto my-10 space-y-6 p-10 xl:p-0">
      <Typography variant="h4" color="green" className="text-center">
        Booking Successful 🎉
      </Typography>
      <Typography variant="paragraph" className="text-center text-gray-600">
        Your Booking ID: <strong>{booking._id}</strong>
      </Typography>

      <Card className="border">
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Flight Details
          </Typography>
          <Typography color="gray">
            {flight.from} ({flight.airport_from}) → {flight.to} (
            {flight.airport_to})
          </Typography>
          <Typography color="gray">
            {flight.airline} — {flight.flight_number}
          </Typography>
          <Typography color="gray">
            Date & Time: {new Date(flight.datetime).toLocaleString()}
          </Typography>
          <Typography color="gray">
            Duration: {flight.duration} minutes
          </Typography>
          <Typography color="gray">
            Price: Rp {Number(flight.price).toLocaleString()}
          </Typography>
        </CardBody>
      </Card>

      <Card className="border">
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Purchaser Information
          </Typography>
          <Typography color="gray">
            Name: {purchase.first_name} {purchase.last_name}
          </Typography>
          <Typography color="gray">Email: {purchase.email}</Typography>
          <Typography color="gray">Phone: {purchase.phone_number}</Typography>
          <Typography color="gray">
            Total Paid: Rp {Number(purchase.total).toLocaleString()}
          </Typography>
        </CardBody>
      </Card>

      <Card className="border">
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Passenger List
          </Typography>
          {booking.passangers.map((p, index) => (
            <div key={p._id} className="mb-2">
              <Typography color="gray">
                {index + 1}. {p.title} {p.first_name} {p.last_name}
              </Typography>
              <Typography color="gray" className="text-sm">
                Date of Birth: {new Date(p.dob).toLocaleDateString()} |
                Nationality: {p.nationality}
              </Typography>
            </div>
          ))}
        </CardBody>
      </Card>

      <Button
        className="bg-cyan-600 p-2 px-3"
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Home
      </Button>
    </div>
  );
}
