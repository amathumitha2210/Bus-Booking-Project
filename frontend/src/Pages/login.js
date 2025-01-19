import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import for named export
import { loginUser } from "../api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phoneNo: "", password: "" });
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(""); 

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const login = async () => {
    if (!formData.phoneNo || !formData.password) {
      setPopupMessage("Please fill in both fields.");
      setPopupType("error");
      setTimeout(() => setPopupMessage(null), 2000);
      return;
    }

    try {
      // Call the login API
      const { data } = await loginUser(formData);
      console.log("Login Response:", data); // Debug the response data

      if (data.token) {
        // Decode the token to extract userId
        const decodedToken = jwtDecode(data.token);
        const userId = decodedToken.id;

        // Save token and userId to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', userId);

        setPopupMessage("Login successful! Redirecting...");
        setPopupType("success");
        setTimeout(() => {
          setPopupMessage(null);
          navigate("/"); // Redirect to homepage
        }, 2000);
      } else {
        setPopupMessage("Error: No token received.");
        setPopupType("error");
        setTimeout(() => setPopupMessage(null), 2000);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setPopupMessage("Login failed. Please check your credentials.");
      setPopupType("error");
      setTimeout(() => setPopupMessage(null), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Left side (Image Section) */}
      <div
        className="hidden lg:flex flex-1 bg-cover bg-center h-full"
        style={{
          backgroundImage: `url('/assets/Bus2.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Right side (Login Form) */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div
          className="bg-white bg-opacity-60 p-8 rounded-xl shadow-xl w-full max-w-sm transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          style={{
            backdropFilter: "blur(15px)", // Enhanced glass effect
            backgroundColor: "rgba(255, 255, 255, 0.6)", // Slightly more transparent background
          }}
        >
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">Welcome Back!</h2>

          {/* Popup Message */}
          {popupMessage && (
            <div
              className={`p-4 mb-4 text-center rounded-lg ${popupType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"} transition-all duration-300`}
            >
              {popupMessage}
            </div>
          )}

          <div className="mb-6">
            <input
              name="phoneNo"
              onChange={handleChange}
              value={formData.phoneNo}
              className="border border-gray-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Phone Number"
              type="tel"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>
          <div className="mb-6">
            <input
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="border border-gray-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Password"
              type="password"
            />
          </div>

          <button
            onClick={login}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gradient-to-l transition-all duration-300"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Don't have an account? 
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
