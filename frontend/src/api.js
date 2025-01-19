import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach the token to requests if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const fetchBookings = () => API.get("/booking/user-bookings");
export const createBooking = (data) => API.post("/booking", data);
export const cancelBooking = (data) => API.post("/booking/cancelBooking", data);

export default API;
