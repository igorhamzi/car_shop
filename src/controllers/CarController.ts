import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/catalog';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async createCar(req: Request & { body: ICar }, res: Response<ICar>) {
    const {
      model,
      year,
      color,
      buyValue,
      seatsQty,
      doorsQty,
    } = req.body;
    const car = {
      model,
      year,
      color,
      buyValue,
      seatsQty,
      doorsQty,
    };
    const createdCar = await this._service.create(car);
    return res.status(201).json(createdCar);
  }

  public async getCars(_req: Request & { body: ICar }, res: Response<ICar[]>) {
    const cars = await this._service.read();
    return res.status(200).json(cars);
  }

  public async getCarById(req: Request & { body: ICar }, res: Response<ICar | null>) {
    const { id } = req.params;
    if (id.length !== 24) throw new Error(ErrorTypes.InvalidMongoId);
    const car = await this._service.readOne(id);
    return res.status(200).json(car);
  }
}