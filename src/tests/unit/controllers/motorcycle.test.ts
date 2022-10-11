import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import MotorcycleModel from '../../../models/Motorcycle'
import MotorcycleService from '../../../services/MotorcycleService'
import MotorcycleController from '../../../controllers/MotorcycleController';
import { Request, Response } from 'express';
import { motorcycleMock, motorcycleMockForUpdateWithId } from '../../mocks/motorcycleMock';

describe('Motorcycle controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Motorcycle', () => {
    it('sucess', async () => {
      req.body = motorcycleMock;
      await motorcycleController.createMotorcycle(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    })
  });

  describe('Read Motorcycles', () => {
    it('sucess', async () => {
      req.body = motorcycleMock;
      await motorcycleController.getMotorcycles(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    })
  });

  describe('Read a Motorcycle', () => {
    it('sucess', async () => {
      req.body = motorcycleMock;
      req.params = { id: motorcycleMockForUpdateWithId._id}
      await motorcycleController.getMotorcycleById(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    })
  });

  describe('Update motorcycle', () => {
    it('sucess', async () => {
      req.body = motorcycleMock;
      req.params = { id: motorcycleMockForUpdateWithId._id}
      await motorcycleController.updateMotorcycle(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    })
  });
});