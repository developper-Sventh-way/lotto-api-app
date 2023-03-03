import { IStateChad, NewStateChad } from './state-chad.model';

export const sampleWithRequiredData: IStateChad = {
  id: 97627,
  name: 'Games microchip',
};

export const sampleWithPartialData: IStateChad = {
  id: 63741,
  name: 'customized',
};

export const sampleWithFullData: IStateChad = {
  id: 82256,
  name: 'Plastic Books',
};

export const sampleWithNewData: NewStateChad = {
  name: 'AGP compressing',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
