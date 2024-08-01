"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTicket = exports.cancelBooking = exports.createBooking = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const event_1 = __importDefault(require("../models/event"));
const createBooking = async (req, res) => {
    try {
        const { userId, eventId, quantity } = req.body;
        if (quantity > 15) {
            return res.status(400).send({ error: 'Cannot book more than 15 tickets in a single request' });
        }
        const event = await event_1.default.findById(eventId);
        if (!event) {
            return res.status(404).send({ error: 'Event not found' });
        }
        if (event.totalTickets - event.bookedTickets < quantity) {
            return res.status(400).send({ error: 'Not enough tickets available' });
        }
        event.bookedTickets += quantity;
        await event.save();
        const booking = new booking_1.default({ userId, eventId, quantity });
        await booking.save();
        res.status(201).send(booking);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.createBooking = createBooking;
const cancelBooking = async (req, res) => {
    try {
        const booking = await booking_1.default.findById(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }
        const event = await event_1.default.findById(booking.eventId);
        if (event) {
            event.bookedTickets -= booking.quantity;
            await event.save();
        }
        await booking_1.default.findByIdAndDelete(req.params.id);
        res.send(booking);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.cancelBooking = cancelBooking;
const printTicket = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await booking_1.default.findById(bookingId).populate('eventId');
        if (!booking) {
            return res.status(404).send({ error: 'Booking not found' });
        }
        res.send({
            bookingId: booking._id,
            userId: booking.userId,
            eventName: booking.eventId.name,
            eventDate: booking.eventId.date,
            quantity: booking.quantity,
            timestamp: booking.timestamp,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.printTicket = printTicket;
