import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock,carMockWithId,carMockForUpdate,carMockForUpdateWithId } from '../../mocks/carMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForUpdateWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    })
  });

  describe('read a car', () => {
    it('successfully read', async () => {
      const carRead = await carModel.read();
      expect(carRead).to.be.deep.equal([carMockWithId]);
    })
  });

  describe('read a car by Id', () => {
    it('successfully read', async () => {
      const carReadById = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(carReadById).to.be.deep.equal(carMockWithId);
    })
  });

  describe('update a car', () => {
		it('update car', async () => {
			const carUpdated = await carModel.update('62cf1fc6498565d94eba52cd', carMockForUpdate);
			expect(carUpdated).to.be.deep.equal(carMockForUpdateWithId);
		});

		it('id not found to update', async () => {
			try {
				await carModel.update('123ERRADO', carMockForUpdate);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('delete a car', () => {
    it('successfully read', async () => {
      const carDeleted = await carModel.delete('4edd40c86762e0fb12000003');
      expect(carDeleted).to.be.deep.equal(carMockForUpdateWithId);
    })
  });
});