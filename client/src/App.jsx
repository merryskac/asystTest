import { Route, Routes } from "react-router-dom";
import { NavbarDefault } from "./components/navbar";
import { Flights } from "./pages/flights";
import FlightDetail from "./pages/flightDetail";
import BookingSuccess from "./pages/bookingSuccess";

function App() {
  return (
    <div>
      <NavbarDefault />
      <Routes>
        <Route path="/" element={<Flights />}></Route>
        <Route path="/booking/:id" element={<FlightDetail />}></Route>
        <Route path="/success/:id" element={<BookingSuccess />}></Route>
      </Routes>
    </div>
  );
}

export default App;
