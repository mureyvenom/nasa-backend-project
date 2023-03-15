import { RequestHandler } from 'express';
import {
  scheduleNewLaunch,
  deleteLaunchById,
  getLaunches,
  launchExists,
} from '../models/launches.model';

export const getAllLaunches: RequestHandler = async (_, res) => {
  return res.status(200).json(await getLaunches());
};

export const addNewLaunch: RequestHandler = async (req, res) => {
  if (!req.body.launchDate || !req.body.mission || !req.body.destination || !req.body.rocket) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  if (new Date(req.body.launchDate).toDateString() === 'Invalid Date') {
    return res.status(400).json({
      message: 'Invalid Date',
    });
  }

  await scheduleNewLaunch(req.body);
  return res.status(201).json(await getLaunches());
};

export const deleteSavedLaunch: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: 'Invalid launch id',
    });
  }

  if (!(await launchExists(parseInt(id)))) {
    return res.status(404).json({
      message: 'Launch not found',
    });
  }

  await deleteLaunchById(parseInt(id));

  return res.status(200).json(await getLaunches());
};
