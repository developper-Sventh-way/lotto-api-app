import dayjs from 'dayjs/esm';

import { IRequestTransactionChad, NewRequestTransactionChad } from './request-transaction-chad.model';

export const sampleWithRequiredData: IRequestTransactionChad = {
  id: 80180,
  description: 'data-warehouse',
};

export const sampleWithPartialData: IRequestTransactionChad = {
  id: 40657,
  description: 'Analyst Outdoors',
};

export const sampleWithFullData: IRequestTransactionChad = {
  id: 96115,
  description: 'USB Designer',
  dateTransaction: dayjs('2023-03-03T03:19'),
};

export const sampleWithNewData: NewRequestTransactionChad = {
  description: 'Corporate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
