import express from 'express';
import { createEvent, getEvents, getEventById } from '../controllers/eventController';

const router = express.Router();

router.post('/events', createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);

export default router;
