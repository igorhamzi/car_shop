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

  describe('read motorcycles', () => {
    it('successfully read', async () => {
      const motorcyclesRead = await motorcycleModel.read();
      expect(motorcyclesRead).to.be.deep.equal([motorcycleMockWithId]);
    })
  });

  describe('read a motorcycle', () => {
    it('successfully read', async () => {
      const motorcycleReadById = await motorcycleModel.readOne('4edd40c86762e0fb12000003');
      expect(motorcycleReadById).to.be.deep.equal(motorcycleMockWithId);
    })
  });

  describe('update a motorcycle', () => {
		it('successfully update', async () => {
			const motorcycleUpdated = await motorcycleModel.update('4edd40c86762e0fb12000003', motorcycleMockForUpdate);
			expect(motorcycleUpdated).to.be.deep.equal(motorcycleMockForUpdateWithId);
		});

		it('id not found to update', async () => {
			try {
				await motorcycleModel.update('123ERRADO', motorcycleMockForUpdate);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
});