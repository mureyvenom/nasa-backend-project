import express from 'express';
import planetsRouter from './planets.router';
import launchesRouter from './launches.router';

const api = express.Router();

api.use(planetsRouter);
api.use(launchesRouter);

export default api;
