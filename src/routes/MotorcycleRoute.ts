import { Router, Request, Response } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/MotorcycleService';

const route = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post(
  '/',
  (req: Request, res: Response) => motorcycleController.createMotorcycle(req, res),
);
route.get(
  '/',
  (req: Request, res: Response) => motorcycleController.getMotorcycles(req, res),
);
route.get(
  '/:id',
  (req: Request, res: Response) => motorcycleController.getMotorcycleById(req, res),
);
route.put(
  '/:id',
  (req: Request, res: Response) => motorcycleController.updateMotorcycle(req, res),
);
route.delete(
  '/:id',
  (req: Request, res: Response) => motorcycleController.deleteMotorcycle(req, res),
);

export default route;