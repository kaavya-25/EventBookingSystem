"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventById = exports.getEvents = exports.createEvent = void 0;
const event_1 = __importDefault(require("../models/event"));
const createEvent = async (req, res) => {
    try {
        const { name, date, totalTickets } = req.body;
        const event = new event_1.default({ name, date, totalTickets });
        await event.save();
        res.status(201).send(event);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.createEvent = createEvent;
const getEvents = async (req, res) => {
    try {
        const events = await event_1.default.find();
        res.send(events);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getEvents = getEvents;
const getEventById = async (req, res) => {
    try {
        const event = await event_1.default.findById(req.params.id);
        if (!event) {
            return res.status(404).send();
        }
        res.send(event);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getEventById = getEventById;
