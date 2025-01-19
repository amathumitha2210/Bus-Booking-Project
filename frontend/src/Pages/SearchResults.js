import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state;

  const [buses, setBuses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/buses", {
          params: { from, to, date },
        });
        setBuses(response.data);
      } catch (err) {
        setError("Failed to fetch buses. Please try again.");
      }
    };
    fetchBuses();
  }, [from, to, date]);

  const bookNow = (busId) => {
    navigate(`/booking/${busId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Search Results</h2>
        <p className="text-lg">
          Buses from <strong>{from}</strong> to <strong>{to}</strong> on <strong>{date}</strong>
        </p>
      </motion.div>

      <div className="mt-10">
        {error ? (
          <motion.p
            className="text-red-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        ) : buses.length === 0 ? (
          <motion.p
            className="text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No buses available for the selected route and date.
          </motion.p>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {buses.map((bus) => (
              <motion.div
                key={bus.id}
                className="bg-white shadow-md rounded-lg p-6 border border-blue-100 hover:shadow-lg transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-xl font-bold text-blue-600">{bus.name}</h3>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Departure:</span> {bus.departure}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Arrival:</span> {bus.arrival}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Price:</span> Rs. {bus.price}
                </p>
                <button
                  onClick={() => bookNow(bus.id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 transition duration-300"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
