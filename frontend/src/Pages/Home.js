import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ from: "", to: "", date: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const searchBuses = () => {
    navigate("/search-results", { state: formData });
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      {/* Main container with background image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/Bus.jpeg)' }}
      >
        {/* Overlay to darken background slightly */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      </div>

      {/* Content Section */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full max-w-screen-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Form Section */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
            Welcome to <span className="text-blue-500">Bus Booking</span>
          </h1>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.input
              name="from"
              onChange={handleChange}
              value={formData.from}
              className="border p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="From"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              name="to"
              onChange={handleChange}
              value={formData.to}
              className="border p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="To"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              name="date"
              onChange={handleChange}
              value={formData.date}
              type="date"
              className="border p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              whileFocus={{ scale: 1.05 }}
            />
          </motion.div>

          <motion.button
            onClick={searchBuses}
            className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 text-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search Buses
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
