import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Import framer motion for animation
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Booking() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [busDetails, setBusDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Fetch bus details
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/buses/${busId}`);
        setBusDetails(response.data);
      } catch (err) {
        setError("Failed to fetch bus details. Please try again.");
        toast.error("Failed to fetch bus details.");
      }
    };

    if (busId) fetchBusDetails();
  }, [busId]);

  // Handle form field changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle seat selection
  const handleSeatSelection = (seat) => {
    if (seat.status === "available") {
      setSelectedSeat({
        seatNo: seat.id,
        seatId: seat.id,
      });
      toast.info(`Seat ${seat.id} selected.`);
    } else {
      setError("This seat is already booked or unavailable.");
      toast.error("This seat is already booked or unavailable.");
    }
  };

  // Get JWT token and userId from localStorage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Ensure user is logged in before proceeding
  useEffect(() => {
    if (!token || !userId) {
      setError("You must be logged in to make a booking.");
      toast.error("You must be logged in to make a booking.");
      navigate("/login"); // Redirect user to login page
    }
  }, [token, userId, navigate]);

  const handleBooking = async () => {
    if (!token || !userId) {
      setError("You must be logged in to make a booking.");
      toast.error("You must be logged in to make a booking.");
      navigate("/login");
      return;
    }

    if (!selectedSeat) {
      setError("Please select a seat before proceeding.");
      toast.error("Please select a seat before proceeding.");
      return;
    }

    if (!formData.name || !formData.age || !formData.contact) {
      setError("Please fill in all passenger details.");
      toast.error("Please fill in all passenger details.");
      return;
    }

    const reservationPayload = {
      busId,
      seatNo: selectedSeat.seatNo,
      seatId: selectedSeat.seatId,
      name: formData.name,
      age: formData.age,
      contact: formData.contact,
      date: formData.date,
      userId,
    };

    try {
      // Reserve the seat
      const reserveResponse = await axios.post(
        "http://localhost:5000/api/booking/reserve-seat",
        reservationPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (reserveResponse.data && reserveResponse.data.message === "Seat reserved successfully.") {
        toast.success("Seat reserved successfully!");
        
        // Confirm the booking
        const confirmPayload = {
          busId: reservationPayload.busId,
          passengers: [
            {
              name: reservationPayload.name,
              age: reservationPayload.age,
              seat: reserveResponse.data.seat.id,
            },
          ],
        };

        const confirmResponse = await axios.post(
          "http://localhost:5000/api/booking/confirm-booking",
          confirmPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (confirmResponse.data && confirmResponse.data.message === "Booking confirmed.") {
          toast.success("Booking confirmed successfully!");
          navigate("/dashboard");
        } else {
          setError("Booking confirmation failed. Please try again.");
          toast.error("Booking confirmation failed.");
        }
      } else {
        setError("Failed to reserve seat. Please try again.");
        toast.error("Failed to reserve seat.");
      }
    } catch (err) {
      console.error("Error during booking process:", err);

      if (err.response) {
        setError(err.response.data.message || "Booking failed. Please try again.");
        toast.error(err.response.data.message || "Booking failed.");
      } else {
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 flex justify-center items-center">
      <ToastContainer />
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl transform transition-all duration-500 hover:scale-105"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-indigo-700 mb-6 text-center">Book Your Seat</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {busDetails ? (
          <>
            <div className="mb-6">
              <p className="text-xl font-semibold text-indigo-600"><strong>Bus Name:</strong> {busDetails.name}</p>
              <p className="text-lg"><strong>Departure:</strong> {busDetails.departure}</p>
              <p className="text-lg"><strong>Arrival:</strong> {busDetails.arrival}</p>
            </div>

            {/* Seat Layout */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-4">Select Your Seat</h3>
              <div className="grid grid-cols-6 gap-3">
                {busDetails.seats.map((seat) => (
                  <motion.button
                    key={seat.id}
                    onClick={() => handleSeatSelection(seat)}
                    className={`p-4 rounded-md text-white ${
                      seat.status === "booked"
                        ? "bg-gray-500 cursor-not-allowed"
                        : seat.status === "available"
                        ? "bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 ease-in-out"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={seat.status === "booked"}
                    whileHover={{ scale: 1.1 }}
                  >
                    {seat.id}
                  </motion.button>
                ))}
              </div>
              {selectedSeat && <p className="text-indigo-500 mt-2">Selected Seat: {selectedSeat.seatNo}</p>}
            </div>

            {/* Passenger Details Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-indigo-600">Name</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Full Name"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-indigo-600">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Age"
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-semibold text-indigo-600">Contact Information</label>
                <input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Contact Number"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-indigo-600">Travel Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <motion.button
              onClick={handleBooking}
              className="w-full bg-indigo-600 text-white py-3 rounded-md mt-6 text-lg font-semibold transition duration-300 ease-in-out hover:bg-indigo-700"
              whileHover={{ scale: 1.05 }}
            >
              Confirm Booking
            </motion.button>
          </>
        ) : (
          <p className="text-center text-xl">Loading bus details...</p>
        )}
      </motion.div>
    </div>
  );
}

export default Booking;
