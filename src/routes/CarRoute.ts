import { Router, Request, Response } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/Car';
import CarService from '../services/CarService';

const route = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

route.post('/', (req: Request, res: Response) => carController.createCar(req, res));

export default route;