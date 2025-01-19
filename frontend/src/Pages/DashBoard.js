import React, { useEffect, useState } from "react";
import { fetchBookings, cancelBooking } from "../api"; // Assume `cancelBooking` is the API function
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const { data } = await fetchBookings();
        setBookings(data.bookings);
        toast.success("Bookings loaded successfully!", { autoClose: 2000 });
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to fetch your bookings.");
        toast.error("Error loading bookings!", { autoClose: 3000 });
      }
    };
    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      setLoading(true);
      toast.info("Canceling booking...", { autoClose: 1000 });
      await cancelBooking({ bookingId, userId: "currentUserId123" }); // Replace with actual userId logic
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      toast.success("Booking canceled successfully!", { autoClose: 2000 });
    } catch (err) {
      console.error("Failed to cancel booking:", err);
      setError("Failed to cancel the booking.");
      toast.error("Error canceling the booking!", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <ToastContainer />
      <motion.h2
        className="text-4xl font-extrabold text-blue-700 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Dashboard
      </motion.h2>

      {error && (
        <motion.p
          className="text-red-500 text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {error}
        </motion.p>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <motion.div
              key={booking.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                Bus ID: <span className="text-gray-700">{booking.busId}</span>
              </h3>
              <p className="text-gray-600">
                <strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>Total Price:</strong> LKR {booking.totalPrice}.00
              </p>
              <h4 className="text-blue-500 font-semibold mt-4">Passengers:</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {booking.passengers.map((passenger, index) => (
                  <li key={index}>
                    {passenger.name} ({passenger.age}) - Seat: {passenger.seat}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                onClick={() => handleCancel(booking.id)}
                disabled={loading}
              >
                {loading ? "Canceling..." : "Cancel Booking"}
              </button>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No bookings found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;
