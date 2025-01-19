const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  price: { type: Number, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Bus", busSchema);
