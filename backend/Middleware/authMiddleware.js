const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateUser;
