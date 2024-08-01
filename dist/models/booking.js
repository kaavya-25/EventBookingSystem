"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    eventId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Booking', bookingSchema);
