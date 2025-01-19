const express = require("express");
const { getBuses, getBusById } = require("../Controllers/busController");
const router = express.Router();

// Route to fetch dummy buses based on search parameters
router.get("/", getBuses);

router.get("/:busId", getBusById);

module.exports = router;
