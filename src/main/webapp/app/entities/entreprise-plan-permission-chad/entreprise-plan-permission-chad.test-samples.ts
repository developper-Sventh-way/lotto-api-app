import { IEntreprisePlanPermissionChad, NewEntreprisePlanPermissionChad } from './entreprise-plan-permission-chad.model';

export const sampleWithRequiredData: IEntreprisePlanPermissionChad = {
  id: 37159,
};

export const sampleWithPartialData: IEntreprisePlanPermissionChad = {
  id: 34033,
  description: 'Investor',
};

export const sampleWithFullData: IEntreprisePlanPermissionChad = {
  id: 60567,
  description: 'Steel Borders feed',
};

export const sampleWithNewData: NewEntreprisePlanPermissionChad = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
