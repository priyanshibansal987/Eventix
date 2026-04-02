import express from "express";
import protect from "../middlewares/auth.middlewares.js";
import {participant} from "../middlewares/authorize.middlewares.js";
import {
  createBooking,
  getBookings,
  getBookingById,
  deleteBooking,
} from "../controllers/booking.controllers.js";

const router = express.Router();

// @route POST /bookings/:eventId
// @desc Create a booking for an event
// @access private (participant only)
router.post("/:eventId", protect, participant, createBooking);

// @route GET /bookings
// @desc Get current user's bookings
// @access private (participant only)
router.get("/", protect, participant, getBookings);

// @route GET /bookings/:id
// @desc Get a single booking by id
// @access private (participant only)
router.get("/:id", protect, participant, getBookingById);

// @route DELETE /bookings/:id
// @desc Delete a booking
// @access private (participant only)
router.delete("/:id", protect, participant, deleteBooking);

export default router;