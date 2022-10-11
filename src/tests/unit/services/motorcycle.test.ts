import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import MotorcycleModel from '../../../models/Motorcycle'
import MotorcycleService from '../../../services/MotorcycleService'
import { motorcycleMock, motorcycleMockWithId, } from '../../mocks/motorcycleMock';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(() => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Car', () => {
    it('sucess', async () => {
      const motorcycleCreate = await motorcycleService.create(motorcycleMock);

      expect(motorcycleCreate).to.be.deep.equal(motorcycleMockWithId);
    })
    it('Failure', async () => {
      try {
        await motorcycleService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  });

  describe('Read Motorcycles', () => {
    it('sucess', async () => {
      const motorcycles = await motorcycleService.read();

    expect(motorcycles).to.be.deep.equal([motorcycleMock]);
    });
  });

  describe('readOne Motorcycles', () => {
    it('sucess', async () => {
      const motorcycles = await motorcycleService.readOne(motorcycleMockWithId._id);

    expect(motorcycles).to.be.deep.equal(motorcycleMockWithId);
    });

    it('failure', async () => {
      try {
        await motorcycleService.readOne(motorcycleMockWithId._id);
      } catch (error:any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    })
  });
});