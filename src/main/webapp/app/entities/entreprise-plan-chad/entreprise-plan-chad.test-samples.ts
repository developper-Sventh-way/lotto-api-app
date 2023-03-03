import { TypePlan } from 'app/entities/enumerations/type-plan.model';

import { IEntreprisePlanChad, NewEntreprisePlanChad } from './entreprise-plan-chad.model';

export const sampleWithRequiredData: IEntreprisePlanChad = {
  id: 5459,
  prix: 8398,
  name: 'olive',
  type: TypePlan['Annuel'],
};

export const sampleWithPartialData: IEntreprisePlanChad = {
  id: 29981,
  prix: 11326,
  name: 'Account turn-key Account',
  type: TypePlan['Annuel'],
  requestPerDay: 81826,
};

export const sampleWithFullData: IEntreprisePlanChad = {
  id: 31424,
  prix: 55053,
  name: 'Account Bedfordshire',
  type: TypePlan['Annuel'],
  avantage: 'cross-platform payment',
  requestPerDay: 43429,
};

export const sampleWithNewData: NewEntreprisePlanChad = {
  prix: 66113,
  name: 'Engineer Tasty',
  type: TypePlan['Mensuel'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
