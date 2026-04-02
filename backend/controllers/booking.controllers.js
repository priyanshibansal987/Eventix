import Booking from "../models/booking.models.js";
import Event from "../models/event.models.js";
import { initiatePayment } from "./payment.controllers.js";

const createBooking = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { quantity } = req.body;

        const qty = Number(quantity);
        if (!eventId) {
            return res.status(400).json({ success: false, message: "Missing eventId" });
        }
        if (!Number.isInteger(qty) || qty < 1) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid quantity. It must be a positive integer." });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        if (event.status !== "active") {
            return res
                .status(400)
                .json({ success: false, message: `Event is not active (status: ${event.status})` });
        }

        const availableTickets = event.ticketsRemaining;
        if (qty > availableTickets) {
            return res.status(400).json({
                success: false,
                message: `Only ${availableTickets} ticket(s) available`,
            });
        }

        const totalPrice = qty * event.price;

        // Payment is handled separately and will be wired up with Razorpay later.
        const paymentResult = await initiatePayment({
            userId: req.user._id,
            eventId: event._id,
            amount: totalPrice,
            quantity: qty,
        });

        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: eventId,
                status: "active",
            },
            { $inc: { ticketsSold: qty } },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(409).json({
                success: false,
                message: "Not enough tickets available. Please try again.",
            });
        }

        const booking = await Booking.create({
            user: req.user._id,
            event: eventId,
            quantity: qty,
            totalPrice,
            status: "booked",
            paymentId: paymentResult?.paymentId ?? null,
        });

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: { booking, event: updatedEvent },
        });
    } catch (error) {
        console.error("createBooking error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "participant") {
            return res.status(403).json({ success: false, message: "Only participants can view bookings" });
        }

        const bookings = await Booking.find({ user: req.user._id })
            .populate("event")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, message: "Bookings fetched successfully", data: bookings });
    } catch (error) {
        console.error("getBookings error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findOne({ _id: id, user: req.user._id }).populate("event");

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        return res.status(200).json({ success: true, message: "Booking fetched successfully", data: booking });
    } catch (error) {
        console.error("getBookingById error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findOne({ _id: id, user: req.user._id });
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if (booking.status === "booked") {
            await Event.findOneAndUpdate(
                { _id: booking.event },
                { $inc: { ticketsSold: -booking.quantity } }
            );
        }

        await booking.deleteOne();

        return res.status(200).json({ success: true, message: "Booking deleted successfully" });
    } catch (error) {
        console.error("deleteBooking error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export { createBooking, getBookings, getBookingById, deleteBooking };
