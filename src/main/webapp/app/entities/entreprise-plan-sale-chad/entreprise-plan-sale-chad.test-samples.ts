import dayjs from 'dayjs/esm';

import { PlanStatut } from 'app/entities/enumerations/plan-statut.model';

import { IEntreprisePlanSaleChad, NewEntreprisePlanSaleChad } from './entreprise-plan-sale-chad.model';

export const sampleWithRequiredData: IEntreprisePlanSaleChad = {
  id: 48019,
  token: 'open-source Berkshire',
  statut: PlanStatut['Active'],
};

export const sampleWithPartialData: IEntreprisePlanSaleChad = {
  id: 59596,
  token: 'bandwidth-monitored architectures 24',
  statut: PlanStatut['Expired'],
};

export const sampleWithFullData: IEntreprisePlanSaleChad = {
  id: 83164,
  token: 'Electronics Planner',
  startDate: dayjs('2023-03-03T16:34'),
  expirateDate: dayjs('2023-03-03T00:28'),
  statut: PlanStatut['Active'],
};

export const sampleWithNewData: NewEntreprisePlanSaleChad = {
  token: 'Colombia Card Towels',
  statut: PlanStatut['Active'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
