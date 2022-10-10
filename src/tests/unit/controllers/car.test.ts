import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car'
import CarService from '../../../services/CarService'
import CarController from '../../../controllers/CarController';
import { Request, Response } from 'express';
import { carMock, carMockForUpdateWithId } from '../../mocks/carMock';

describe('Car controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'read').resolves([carMock]);
    sinon.stub(carService, 'readOne').resolves(carMockForUpdateWithId);
    sinon.stub(carService, 'update').resolves(carMockForUpdateWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Car', () => {
    it('sucess', async () => {
      req.body = carMock;
      await carController.createCar(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    })
  });

  describe('Read Car', () => {
    it('sucess', async () => {
      req.body = carMock;
      await carController.getCars(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    })
  });

  describe('Read Car by Id', () => {
    it('sucess', async () => {
      req.body = carMock;
      await carController.getCarById(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    })
  });

  describe('Update car', () => {
    it('sucess', async () => {
      req.body = carMock;
      req.params = { id: carMockForUpdateWithId._id}
      await carController.updateCar(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    })
  });
});