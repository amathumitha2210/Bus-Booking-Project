import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.nav
      className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg p-4"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wider hover:opacity-90 transition duration-300"
        >
          Bus Booking
        </Link>

        <motion.div
          className="flex items-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            className="text-white font-semibold hover:text-gray-200 transition duration-300"
            to="/"
          >
            Home
          </Link>
          {token ? (
            <>
              <Link
                className="text-white font-semibold hover:text-gray-200 transition duration-300"
                to="/dashboard"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-white font-semibold hover:text-gray-200 transition duration-300"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition duration-300"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
