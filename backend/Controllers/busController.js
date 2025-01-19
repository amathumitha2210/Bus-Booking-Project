// Dummy data
const dummyBuses = [
  { 
    id: "1", name: "Superline Express", departure: "08:00 AM", arrival: "12:00 PM", price: 1500, from: "Colombo", to: "Kandy", date: "2025-01-21",
    seats: [
      { id: "A1", status: "available" },
      { id: "A2", status: "booked" },
      { id: "A3", status: "available" },
      { id: "A4", status: "available" },
      { id: "B1", status: "booked" },
      { id: "B2", status: "available" },
      { id: "B3", status: "available" },
      { id: "B4", status: "available" },
      { id: "C1", status: "booked" },
      { id: "C2", status: "available" },
      { id: "C3", status: "available" },
      { id: "C4", status: "booked"},
      { id: "D1", status: "available" },
      { id: "D2", status: "available" },
    ]
  },
  { 
    id: "2", name: "Luxury Travel", departure: "10:00 AM", arrival: "02:00 PM", price: 2000, from: "Colombo", to: "Kandy", date: "2025-01-21",
    seats: [
      { id: "A1", status: "available" },
      { id: "A2", status: "available" },
      { id: "A3", status: "booked" },
      { id: "A4", status: "available" },
      { id: "B1", status: "available" },
      { id: "B2", status: "booked" },
      { id: "B3", status: "available" },
      { id: "B4", status: "available" },
      { id: "C1", status: "booked" },
      { id: "C2", status: "available" },
      { id: "C3", status: "available" },
      { id: "C4", status: "booked"},
      { id: "D1", status: "available" },
      { id: "D2", status: "available" },
      
    ]
  },
  { 
    id: "3", name: "Cityliner Deluxe", departure: "05:00 PM", arrival: "09:00 PM", price: 1200, from: "Colombo", to: "Galle", date: "2025-01-22",
    seats: [
      { id: "A1", status: "available" },
      { id: "A2", status: "available" },
      { id: "A3", status: "booked" },
      { id: "A4", status: "available" },
      { id: "B1", status: "booked" },
      { id: "B2", status: "available" },
      { id: "B3", status: "available" },
      { id: "B4", status: "available" },
      { id: "C1", status: "booked" },
      { id: "C2", status: "available" },
      { id: "C3", status: "available" },
      { id: "C4", status: "booked"},
      { id: "D1", status: "available" },
      { id: "D2", status: "available" },
    ]
  },
  { 
    id: "4", name: "Speedy Wheels", departure: "07:00 AM", arrival: "11:00 AM", price: 1800, from: "Galle", to: "Colombo", date: "2025-01-23",
    seats: [
      { id: "A1", status: "booked" },
      { id: "A2", status: "available" },
      { id: "A3", status: "available" },
      { id: "A4", status: "booked" },
      { id: "B1", status: "available" },
      { id: "B2", status: "booked" },
      { id: "B3", status: "available" },
      { id: "B4", status: "available" },
      { id: "C1", status: "booked" },
      { id: "C2", status: "available" },
      { id: "C3", status: "available" },
      { id: "C4", status: "booked"},
      { id: "D1", status: "available" },
      { id: "D2", status: "available" },
    ]
  },
  { 
    id: "5", name: "Budget Rider", departure: "09:30 AM", arrival: "01:30 PM", price: 1000, from: "Colombo", to: "Jaffna", date: "2025-01-25",
    seats: [
      { id: "A1", status: "available" },
      { id: "A2", status: "booked" },
      { id: "A3", status: "available" },
      { id: "A4", status: "available" },
      { id: "B1", status: "available" },
      { id: "B2", status: "available" },
      { id: "B3", status: "booked" },
      { id: "B4", status: "available" },
      { id: "C1", status: "booked" },
      { id: "C2", status: "available" },
      { id: "C3", status: "available" },
      { id: "C4", status: "booked"},
      { id: "D1", status: "available" },
      { id: "D2", status: "available" },
    ]
  }
];

// Search buses
// Get list of buses based on search query parameters (from, to, and date)
const getBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    // Validate query parameters
    if (!from || !to || !date) {
      return res.status(400).json({ message: "Please provide 'from', 'to', and 'date' parameters." });
    }

    // Filter dummy data based on query parameters
    const filteredBuses = dummyBuses.filter(
      (bus) =>
        bus.from.toLowerCase() === from.trim().toLowerCase() &&
        bus.to.toLowerCase() === to.trim().toLowerCase() &&
        bus.date === date.trim()
    );

    if (filteredBuses.length === 0) {
      return res.status(404).json({ message: "No buses found for the given route and date" });
    }

    res.json(filteredBuses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buses", error });
  }
};

// Get details of a specific bus including seats
const getBusById = (req, res) => {
  try {
    const { busId } = req.params; // Get the busId from the URL parameters
    const bus = dummyBuses.find((bus) => bus.id === busId); // Find the bus by id
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(bus);  // Return bus details including seats
  } catch (error) {
    res.status(500).json({ message: "Error fetching bus", error });
  }
};

module.exports = { getBuses, getBusById };
