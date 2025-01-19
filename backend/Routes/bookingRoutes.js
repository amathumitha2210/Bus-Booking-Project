const express = require('express');
const router = express.Router();
const authenticateUser = require('../Middleware/authMiddleware'); // Import the authentication middleware
const { reserveSeat, confirmBooking, releaseSeat,getBookingsForUser, cancelBooking } = require('../Controllers/bookingController');

router.post('/reserve-seat',authenticateUser ,reserveSeat);
router.post('/confirm-booking', authenticateUser, confirmBooking);
router.post('/release-seat', authenticateUser, releaseSeat);
router.get("/user-bookings", authenticateUser, getBookingsForUser);
router.post("/cancelBooking", authenticateUser, cancelBooking);


module.exports = router;
