import { Request, Response } from 'express';
import Event from '../models/event';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, date, totalTickets } = req.body;
    const event = new Event({ name, date, totalTickets });
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};
