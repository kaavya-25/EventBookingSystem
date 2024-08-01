"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
router.post('/events', eventController_1.createEvent);
router.get('/events', eventController_1.getEvents);
router.get('/events/:id', eventController_1.getEventById);
exports.default = router;
