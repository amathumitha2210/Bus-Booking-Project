import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { useSpring, animated } from "@react-spring/web";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phoneNo: "", password: "", name: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const register = async () => {
    try {
      await registerUser(formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  // Animations for success and error
  const successAnimation = useSpring({
    opacity: showSuccess ? 1 : 0,
    transform: showSuccess ? "translateY(0px)" : "translateY(-20px)",
    config: { tension: 200, friction: 15 },
  });

  const errorAnimation = useSpring({
    opacity: showError ? 1 : 0,
    transform: showError ? "translateY(0px)" : "translateY(-20px)",
    config: { tension: 200, friction: 15 },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-semibold text-center mb-6 text-gray-800">Create Your Account</h2>

        <input
          name="name"
          onChange={handleChange}
          value={formData.name}
          className="border border-gray-300 p-4 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Full Name"
          type="text"
        />
        <input
          name="phoneNo"
          onChange={handleChange}
          value={formData.phoneNo}
          className="border border-gray-300 p-4 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Phone Number"
          type="tel"
          pattern="[0-9]{10}" // Matches 10 digits
          title="Please enter a valid 10-digit phone number"
        />
        <input
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="border border-gray-300 p-4 w-full rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Password"
          type="password"
        />
        <button
          onClick={register}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg transition-all duration-300 hover:opacity-90 focus:ring-4 focus:ring-blue-500"
        >
          Register
        </button>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <animated.div
          style={successAnimation}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg"
        >
          Registration Successful! Redirecting...
        </animated.div>
      )}

      {/* Error Popup */}
      {showError && (
        <animated.div
          style={errorAnimation}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-3 px-6 rounded-lg shadow-lg"
        >
          Registration Failed. Please try again!
        </animated.div>
      )}
    </div>
  );
}

export default Register;
