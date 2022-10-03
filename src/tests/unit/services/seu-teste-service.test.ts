import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../../mocks/carMock';
import { ZodError } from 'zod';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Car', () => {
    it('sucess', async () => {
      const carCreate = await carService.create(carMock);

      expect(carCreate).to.be.deep.equal(carMockWithId);
    })
    it('Failure', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  });
});