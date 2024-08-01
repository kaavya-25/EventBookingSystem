import express from 'express';
import { createBooking, cancelBooking, printTicket } from '../controllers/bookingcontroller';

const router = express.Router();

router.post('/bookings', createBooking);
router.delete('/bookings/:id', cancelBooking);
router.post('/print-ticket', printTicket);

export default router;
