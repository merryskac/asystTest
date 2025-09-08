import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function FlightDetail() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  const [purchase, setPurchase] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
  });

  const [passengers, setPassengers] = useState([
    { title: "", first_name: "", last_name: "", dob: "", nationality: "" },
  ]);

  const fetchFlight = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/api/flights/${id}`
      );
      const data = await res.json();
      setFlight(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlight();
  }, [id]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", nationality: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...purchase,
      total: flight.price * passengers.length,
      passangers: passengers,
    };

    if (isNaN(bookingData.total)) {
      alert("Price not valid");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/api/booking/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );
      const result = await res.json();
      if (res.ok) {
        navigate(`/success/${result.data.id}`);
      } else {
        alert(result.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting booking");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!flight) return <p>Flight not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6 shadow-md">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {flight.from} ({flight.airport_from}) → {flight.to} (
            {flight.airport_to})
          </Typography>
          <Typography color="gray">
            {flight.airline} | Flight No: {flight.flight_number}
          </Typography>
          <Typography color="gray">
            Departure: {new Date(flight.datetime).toLocaleString()}
          </Typography>
          <Typography color="gray">Duration: {flight.duration} mins</Typography>
          <Typography color="green" className="mt-2 font-bold">
            Rp {flight.price}
          </Typography>
        </CardBody>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardBody>
            <Typography variant="h6" className="mb-4">
              Purchase Information
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={purchase.first_name}
                required
                onChange={(e) =>
                  setPurchase({ ...purchase, first_name: e.target.value })
                }
                className="p-2 rounded-sm"
              />
              <Input
                label="Last Name"
                value={purchase.last_name}
                required
                onChange={(e) =>
                  setPurchase({ ...purchase, last_name: e.target.value })
                }
                className="p-2 rounded-sm"
              />
              <Input
                label="Phone Number"
                value={purchase.phone_number}
                type="tel"
                required
                onChange={(e) =>
                  setPurchase({ ...purchase, phone_number: e.target.value })
                }
                className="p-2 rounded-sm"
              />
              <Input
                label="Email"
                type="email"
                value={purchase.email}
                required
                onChange={(e) =>
                  setPurchase({ ...purchase, email: e.target.value })
                }
                className="p-2 rounded-sm"
              />
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardBody>
            <Typography variant="h6" className="mb-4">
              Passenger(s) Information
            </Typography>
            {passengers.map((passenger, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
              >
                <Input
                  label="Title (Mr/Ms/Mrs)"
                  value={passenger.title}
                  required
                  onChange={(e) =>
                    handlePassengerChange(index, "title", e.target.value)
                  }
                  className="p-2 rounded-sm"
                />
                <Input
                  label="First Name"
                  value={passenger.first_name}
                  required
                  onChange={(e) =>
                    handlePassengerChange(index, "first_name", e.target.value)
                  }
                  className="p-2 rounded-sm"
                />
                <Input
                  label="Last Name"
                  value={passenger.last_name}
                  required
                  onChange={(e) =>
                    handlePassengerChange(index, "last_name", e.target.value)
                  }
                  className="p-2 rounded-sm"
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={passenger.dob}
                  required
                  onChange={(e) =>
                    handlePassengerChange(index, "dob", e.target.value)
                  }
                  className="p-2 rounded-sm"
                />
                <Input
                  label="Nationality"
                  value={passenger.nationality}
                  required
                  onChange={(e) =>
                    handlePassengerChange(index, "nationality", e.target.value)
                  }
                  className="p-2 rounded-sm"
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={addPassenger}
              color="green"
              variant="outlined"
              className="p-2"
            >
              + Add Passenger
            </Button>
          </CardBody>
        </Card>

        <Button type="submit" color="blue" className="w-full p-3 bg-cyan-600">
          Book Flight
        </Button>
      </form>
    </div>
  );
}
