import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import planetsRouter from './routes/planets.router';
import launchesRouter from './routes/launches.router';

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(planetsRouter);
app.use(launchesRouter);

export default app;
