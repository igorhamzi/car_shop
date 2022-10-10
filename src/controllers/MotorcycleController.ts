import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/catalog';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async createMotorcycle(req: Request & { body: IMotorcycle }, res: Response<IMotorcycle>) {
    const {
      model,
      year,
      color,
      buyValue,
      category,
      engineCapacity,
    } = req.body;
    const motorcycle = {
      model,
      year,
      color,
      buyValue,
      category,
      engineCapacity,
    };
    const motorcycleCreated = await this._service.create(motorcycle);
    return res.status(201).json(motorcycleCreated);
  }

  public async getMotorcycles(_req: Request & { body: IMotorcycle }, res: Response<IMotorcycle[]>) {
    const motorcycles = await this._service.read();
    return res.status(200).json(motorcycles);
  }

  public async getMotorcycleById(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle | null>,
  ) {
    const { id } = req.params;
    if (id.length !== 24) throw new Error(ErrorTypes.InvalidMongoId);
    const car = await this._service.readOne(id);
    return res.status(200).json(car);
  }

  public async updateMotorcycle(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle | null>,
  ) {
    const { id } = req.params;
    if (id.length !== 24) throw new Error(ErrorTypes.InvalidMongoId);
    const motorcycleUpdated = await this._service.update(id, req.body);
    return res.status(200).json(motorcycleUpdated);
  }

  public async deleteMotorcycle(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle | null>,
  ) {
    const { id } = req.params;
    if (id.length !== 24) throw new Error(ErrorTypes.InvalidMongoId);
    const motorcycleDeleted = await this._service.delete(id);
    return res.status(204).json(motorcycleDeleted);
  }
}