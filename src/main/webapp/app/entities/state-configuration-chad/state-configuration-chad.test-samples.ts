import { ConfigStatut } from 'app/entities/enumerations/config-statut.model';

import { IStateConfigurationChad, NewStateConfigurationChad } from './state-configuration-chad.model';

export const sampleWithRequiredData: IStateConfigurationChad = {
  id: 51556,
  startHour: 'engineer',
  endHour: 'Credit',
};

export const sampleWithPartialData: IStateConfigurationChad = {
  id: 78239,
  startHour: 'index',
  endHour: 'Silver',
};

export const sampleWithFullData: IStateConfigurationChad = {
  id: 41375,
  startHour: 'Hat Technician Division',
  endHour: 'sensor programming Applications',
  statut: ConfigStatut['ACTIVE'],
};

export const sampleWithNewData: NewStateConfigurationChad = {
  startHour: 'Chicken',
  endHour: 'Macao Pass Intelligent',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
