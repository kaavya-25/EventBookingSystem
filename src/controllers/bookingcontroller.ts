// src/controllers/bookingController.ts
import { Request, Response } from 'express';
import Booking from '../models/booking';
import Event from '../models/event';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, quantity } = req.body;

    if (quantity > 15) {
      return res.status(400).send({ error: 'Cannot book more than 15 tickets in a single request' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send({ error: 'Event not found' });
    }

    if (event.totalTickets - event.bookedTickets < quantity) {
      return res.status(400).send({ error: 'Not enough tickets available' });
    }

    event.bookedTickets += quantity;
    await event.save();

    const booking = new Booking({ userId, eventId, quantity });
    await booking.save();

    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send();
    }

    const event = await Event.findById(booking.eventId);
    if (event) {
      event.bookedTickets -= booking.quantity;
      await event.save();
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.send(booking);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const printTicket = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId).populate('eventId');
    if (!booking) {
      return res.status(404).send({ error: 'Booking not found' });
    }

    res.send({
      bookingId: booking._id,
      userId: booking.userId,
      eventName: (booking.eventId as any).name,
      eventDate: (booking.eventId as any).date,
      quantity: booking.quantity,
      timestamp: booking.timestamp,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
