"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventById = exports.getEvents = exports.createEvent = void 0;
const event_1 = __importDefault(require("../models/event"));
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, date, totalTickets } = req.body;
        const event = new event_1.default({ name, date, totalTickets });
        yield event.save();
        res.status(201).send(event);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createEvent = createEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_1.default.find();
        res.send(events);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getEvents = getEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield event_1.default.findById(req.params.id);
        if (!event) {
            return res.status(404).send();
        }
        res.send(event);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getEventById = getEventById;
