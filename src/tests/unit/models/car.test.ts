import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
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
      const carRead = await carModel.create(carMock);
      expect(carRead).to.be.deep.equal(carMockWithId);
    })
  });

  describe('read a car by Id', () => {
    it('successfully read', async () => {
      const carReadById = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(carReadById).to.be.deep.equal(carMockWithId);
    })
  });
});