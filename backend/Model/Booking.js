const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true, index: true },
  passengers: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true, min: [0, "Age must be a positive number"] },
      seat: {
        type: String,
        required: true,
        validate: {
          validator: (v) => /^[A-Z]\d+$/.test(v),
          message: (props) => `${props.value} is not a valid seat number!`,
        },
      },
    },
  ],
  totalPrice: { type: Number, required: true, min: [0, "Total price cannot be negative"] },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
