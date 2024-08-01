import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import eventRoutes from './routes/eventroutes';
import bookingRoutes from './routes/bookingroutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', eventRoutes);
app.use('/api', bookingRoutes);

export default app;
