import { RequestHandler } from 'express';
import { fetchPlanets } from '../models/planets.model';

const getAllPlanets: RequestHandler = async (_, res, next) => {
  return res.status(200).json(await fetchPlanets());
};

export { getAllPlanets };
