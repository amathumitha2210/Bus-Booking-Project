const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config");

/**
 * Register a new user
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
const register = async (req, res) => {
  try {
    const { name, phoneNo, password } = req.body;

    // Normalize phone number (remove non-numeric characters like dashes, spaces, etc.)
    const normalizedPhoneNo = phoneNo.replace(/\D/g, "");

    // Validate inputs
    if (!name || !normalizedPhoneNo || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Check if the phone number is already taken
    const existingUser = await User.findOne({ phoneNo: normalizedPhoneNo });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number is already registered" });
    }

    // Create the user with hashed password
    const user = await User.create({ name, phoneNo: normalizedPhoneNo, password });

    // Return success response
    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "User registration failed", error: error.message });
  }
};

/**
 * Login a user
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
const login = async (req, res) => {
  try {
    const { phoneNo, password } = req.body;

    // Normalize phone number (remove non-numeric characters like dashes, spaces, etc.)
    const normalizedPhoneNo = phoneNo.replace(/\D/g, "");

    // Validate inputs
    if (!normalizedPhoneNo || !password) {
      return res.status(400).json({ message: "Please provide both phone number and password" });
    }

    // Find the user by phone number
    const user = await User.findOne({ phoneNo: normalizedPhoneNo });

    // Validate user existence and password
    if (!user) {
      return res.status(401).json({ message: "Invalid phone number or password" });
    }

    // Check if the entered password matches the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid phone number or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    // Return success response with token
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = { register, login };
