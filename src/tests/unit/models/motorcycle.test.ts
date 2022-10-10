import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockForUpdate,
  motorcycleMockForUpdateWithId,
} from '../../mocks/motorcycleMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a motorcycle', () => {
    it('successfully created', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    })
  });
});