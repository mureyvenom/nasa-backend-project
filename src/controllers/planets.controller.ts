import { RequestHandler } from 'express';
import planets from '../models/planets.model';

const getAllPlanets: RequestHandler = (_, res, next) => {
  return res.status(200).json(planets);
};

export { getAllPlanets };
