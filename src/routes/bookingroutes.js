"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingcontroller_1 = require("../controllers/bookingcontroller");
const router = express_1.default.Router();
router.post('/bookings', bookingcontroller_1.createBooking);
router.delete('/bookings/:id', bookingcontroller_1.cancelBooking);
router.post('/print-ticket', bookingcontroller_1.printTicket);
exports.default = router;
