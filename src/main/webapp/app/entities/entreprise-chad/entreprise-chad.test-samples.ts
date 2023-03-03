import { IEntrepriseChad, NewEntrepriseChad } from './entreprise-chad.model';

export const sampleWithRequiredData: IEntrepriseChad = {
  id: 29492,
  name: 'teal',
  representant: 'Tajikistan TCP',
};

export const sampleWithPartialData: IEntrepriseChad = {
  id: 86703,
  name: 'District toolset Frozen',
  representant: 'green Tanzania monitor',
  nif: 'Michigan Pre-emptive',
};

export const sampleWithFullData: IEntrepriseChad = {
  id: 18530,
  name: 'Soap',
  representant: 'bottom-line technologies',
  cin: 'distributed Chief Facilitator',
  nif: 'auxiliary',
};

export const sampleWithNewData: NewEntrepriseChad = {
  name: 'alarm Licensed Rand',
  representant: 'cross-platform empower North',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
