import express from 'express';
import {
  addNewLaunch,
  deleteSavedLaunch,
  getAllLaunches,
} from '../controllers/launches.controller';

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches);

launchesRouter.post('/launches', addNewLaunch);

launchesRouter.delete('/launches/:id', deleteSavedLaunch);

export default launchesRouter;
