const Booking = require("../Model/Booking");
const Bus = require("../Model/Bus");
const User = require("../Model/user");

const dummyBuses = [
  {
    id: "1",
    name: "Superline Express",
    departure: "08:00 AM",
    arrival: "12:00 PM",
    price: 1500,
    from: "Colombo",
    to: "Kandy",
    date: "2025-01-21",
    seats: [
      { id: "A1", status: "available", reservedBy: null },
      { id: "A2", status: "booked", reservedBy: null },
      { id: "A3", status: "available", reservedBy: null },
      { id: "A4", status: "available", reservedBy: null },
      { id: "B1", status: "booked", reservedBy: null },
      { id: "B2", status: "available", reservedBy: null },
      { id: "B3", status: "available", reservedBy: null },
      { id: "B4", status: "available", reservedBy: null },
      { id: "C1", status: "booked", reservedBy: null },
      { id: "C2", status: "available", reservedBy: null },
      { id: "C3", status: "available", reservedBy: null },
      { id: "C4", status: "booked", reservedBy: null },
      { id: "D1", status: "available", reservedBy: null },
      { id: "D2", status: "available", reservedBy: null },
    ]
  },
  {
    id: "2",
    name: "Luxury Travel",
    departure: "10:00 AM",
    arrival: "02:00 PM",
    price: 2000,
    from: "Colombo",
    to: "Kandy",
    date: "2025-01-21",
    seats: [
      { id: "A1", status: "available", reservedBy: null },
      { id: "A2", status: "available", reservedBy: null },
      { id: "A3", status: "booked", reservedBy: null },
      { id: "A4", status: "available", reservedBy: null },
      { id: "B1", status: "available", reservedBy: null },
      { id: "B2", status: "booked", reservedBy: null },
      { id: "B3", status: "available", reservedBy: null },
      { id: "B4", status: "available", reservedBy: null },
      { id: "C1", status: "booked", reservedBy: null },
      { id: "C2", status: "available", reservedBy: null },
      { id: "C3", status: "available", reservedBy: null },
      { id: "C4", status: "booked", reservedBy: null },
      { id: "D1", status: "available", reservedBy: null },
      { id: "D2", status: "available", reservedBy: null },
    ]
  },
  {
    id: "3",
    name: "Cityliner Deluxe",
    departure: "05:00 PM",
    arrival: "09:00 PM",
    price: 1200,
    from: "Colombo",
    to: "Galle",
    date: "2025-01-22",
    seats: [
      { id: "A1", status: "available", reservedBy: null },
      { id: "A2", status: "available", reservedBy: null },
      { id: "A3", status: "booked", reservedBy: null },
      { id: "A4", status: "available", reservedBy: null },
      { id: "B1", status: "booked", reservedBy: null },
      { id: "B2", status: "available", reservedBy: null },
      { id: "B3", status: "available", reservedBy: null },
      { id: "B4", status: "available", reservedBy: null },
      { id: "C1", status: "booked", reservedBy: null },
      { id: "C2", status: "available", reservedBy: null },
      { id: "C3", status: "available", reservedBy: null },
      { id: "C4", status: "booked", reservedBy: null },
      { id: "D1", status: "available", reservedBy: null },
      { id: "D2", status: "available", reservedBy: null },
    ]
  },
  {
    id: "4",
    name: "Speedy Wheels",
    departure: "07:00 AM",
    arrival: "11:00 AM",
    price: 1800,
    from: "Galle",
    to: "Colombo",
    date: "2025-01-23",
    seats: [
      { id: "A1", status: "booked", reservedBy: null },
      { id: "A2", status: "available", reservedBy: null },
      { id: "A3", status: "available", reservedBy: null },
      { id: "A4", status: "booked", reservedBy: null },
      { id: "B1", status: "available", reservedBy: null },
      { id: "B2", status: "booked", reservedBy: null },
      { id: "B3", status: "available", reservedBy: null },
      { id: "B4", status: "available", reservedBy: null },
      { id: "C1", status: "booked", reservedBy: null },
      { id: "C2", status: "available", reservedBy: null },
      { id: "C3", status: "available", reservedBy: null },
      { id: "C4", status: "booked", reservedBy: null },
      { id: "D1", status: "available", reservedBy: null },
      { id: "D2", status: "available", reservedBy: null },
    ]
  },
  {
    id: "5",
    name: "Budget Rider",
    departure: "09:30 AM",
    arrival: "01:30 PM",
    price: 1000,
    from: "Colombo",
    to: "Jaffna",
    date: "2025-01-25",
    seats: [
      { id: "A1", status: "available", reservedBy: null },
      { id: "A2", status: "booked", reservedBy: null },
      { id: "A3", status: "available", reservedBy: null },
      { id: "A4", status: "available", reservedBy: null },
      { id: "B1", status: "available", reservedBy: null },
      { id: "B2", status: "available", reservedBy: null },
      { id: "B3", status: "booked", reservedBy: null },
      { id: "B4", status: "available", reservedBy: null },
      { id: "C1", status: "booked", reservedBy: null },
      { id: "C2", status: "available", reservedBy: null },
      { id: "C3", status: "available", reservedBy: null },
      { id: "C4", status: "booked", reservedBy: null },
      { id: "D1", status: "available", reservedBy: null },
      { id: "D2", status: "available", reservedBy: null },
    ]
  },
];






const bookings = []; // Store confirmed bookings
const seatReservations = {}; // Temporary seat reservations { userId: [seatId] }

// **Reserve Seat Temporarily**
const reserveSeat = async (req, res) => {
  try {
    const { busId, seatId } = req.body;
    const userId = req.user.id; // Get the user ID from the authenticated user (req.user)

    // Validate request
    if (!busId || !seatId || !userId) {
      return res.status(400).json({ message: "Bus ID, seat ID, and user ID are required." });
    }

    // Use the User model to fetch the user (optional, depending on your requirements)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const bus = dummyBuses.find((bus) => bus.id === busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found." });
    }

    const seat = bus.seats.find((s) => s.id === seatId);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found." });
    }

    if (seat.status !== "available") {
      return res.status(400).json({ message: "Seat is already booked or reserved by another user." });
    }

    // Reserve the seat temporarily
    seat.status = "reserved";
    seat.reservedBy = userId;

    // Track reservations for the user
    if (!seatReservations[userId]) {
      seatReservations[userId] = [];
    }
    seatReservations[userId].push(seatId);

    res.status(200).json({ message: "Seat reserved successfully.", seat });
  } catch (error) {
    console.error("Error reserving seat:", error);
    res.status(500).json({ message: "Error reserving seat. Please try again later.", error });
  }
};

// **Confirm Booking**
const confirmBooking = async (req, res) => {
  try {
    const { busId, passengers } = req.body;
    const userId = req.user.id; // Get the user ID from the authenticated user (req.user)

    // Validate required fields
    if (!busId || !userId || !passengers || passengers.length === 0) {
      return res.status(400).json({ message: "Bus ID, user ID, and passengers are required." });
    }

    // Ensure that each passenger has the required fields: name, age, and seat
    const missingFields = passengers.filter(
      (passenger) => !passenger.name || !passenger.age || !passenger.seat
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Some passengers are missing required fields (name, age, seat).",
        missingFields,
      });
    }

    // Use the User model to fetch the user (optional)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the bus by its ID
    const bus = dummyBuses.find((bus) => bus.id === busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found." });
    }

    // Check if all the seats are reserved by the user
    const unavailableSeats = passengers.filter((passenger) => {
      const seat = bus.seats.find((s) => s.id === passenger.seat);
      return !seat || seat.status !== "reserved" || seat.reservedBy !== userId;
    });

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: "Some seats are unavailable or not reserved by this user.",
        unavailableSeats: unavailableSeats.map((p) => p.seat),
      });
    }

    // Confirm the booking
    passengers.forEach((passenger) => {
      const seat = bus.seats.find((s) => s.id === passenger.seat);
      if (seat) {
        seat.status = "booked"; // Mark as booked
        seat.reservedBy = null; // Clear reservation
      }
    });

    // Calculate the total price for the booking
    const totalPrice = passengers.length * bus.price;

    // Create a new booking object
    const newBooking = {
      id: `BKG${bookings.length + 1}`,
      busId,
      userId,
      passengers,
      totalPrice,
      bookingDate: new Date(),
    };

    // Add the new booking to the bookings array
    bookings.push(newBooking);

    // Clear reservations for the user
    delete seatReservations[userId];

    // Send a success response
    res.status(201).json({ message: "Booking confirmed.", booking: newBooking });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ message: "Error confirming booking. Please try again later.", error });
  }
};

// **Release Reserved Seat**
const releaseSeat = async (req, res) => {
  try {
    const { busId, seatId } = req.body;
    const userId = req.user.id; // Get the user ID from the authenticated user (req.user)

    if (!busId || !seatId || !userId) {
      return res.status(400).json({ message: "Bus ID, seat ID, and user ID are required." });
    }

    // Use the User model to fetch the user (optional)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const bus = dummyBuses.find((bus) => bus.id === busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found." });
    }

    const seat = bus.seats.find((s) => s.id === seatId);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found." });
    }

    if (seat.reservedBy !== userId) {
      return res.status(400).json({ message: "Seat is not reserved by this user." });
    }

    // Release the seat
    seat.status = "available";
    seat.reservedBy = null;

    // Remove from user's reservations
    if (seatReservations[userId]) {
      seatReservations[userId] = seatReservations[userId].filter((s) => s !== seatId);
      if (seatReservations[userId].length === 0) {
        delete seatReservations[userId];
      }
    }

    res.status(200).json({ message: "Seat released successfully.", seat });
  } catch (error) {
    console.error("Error releasing seat:", error);
    res.status(500).json({ message: "Error releasing seat. Please try again later.", error });
  }
};

const getBookingsForUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user (req.user)

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find all bookings for the user
    const userBookings = bookings.filter((booking) => booking.userId === userId);

    if (userBookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    res.status(200).json({
      message: "Bookings retrieved successfully.",
      bookings: userBookings,
    });
  } catch (error) {
    console.error("Error retrieving bookings for user:", error);
    res.status(500).json({
      message: "Error retrieving bookings. Please try again later.",
      error,
    });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body; // Get the booking ID from the request body
    const userId = req.user.id; // Get the user ID from the authenticated user (req.user)

    // Validate input
    if (!bookingId || !userId) {
      return res.status(400).json({ message: "Booking ID and user ID are required." });
    }

    // Find the booking by ID
    const bookingIndex = bookings.findIndex(
      (booking) => booking.id === bookingId && booking.userId === userId
    );

    if (bookingIndex === -1) {
      return res.status(404).json({ message: "Booking not found for this user." });
    }

    // Get the booking details
    const booking = bookings[bookingIndex];

    // Find the bus associated with the booking
    const bus = dummyBuses.find((bus) => bus.id === booking.busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found for the booking." });
    }

    // Release the booked seats
    booking.passengers.forEach((passenger) => {
      const seat = bus.seats.find((s) => s.id === passenger.seat);
      if (seat) {
        seat.status = "available"; // Mark the seat as available
        seat.reservedBy = null; // Clear the reservedBy field
      }
    });

    // Remove the booking from the bookings array
    bookings.splice(bookingIndex, 1);

    res.status(200).json({ message: "Booking canceled successfully." });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({
      message: "Error canceling booking. Please try again later.",
      error,
    });
  }
};


module.exports = { reserveSeat, confirmBooking, releaseSeat, getBookingsForUser, cancelBooking };
