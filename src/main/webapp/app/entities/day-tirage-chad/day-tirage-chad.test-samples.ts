import dayjs from 'dayjs/esm';

import { TirageType } from 'app/entities/enumerations/tirage-type.model';

import { IDayTirageChad, NewDayTirageChad } from './day-tirage-chad.model';

export const sampleWithRequiredData: IDayTirageChad = {
  id: 16795,
  tirageType: TirageType['MIDI'],
};

export const sampleWithPartialData: IDayTirageChad = {
  id: 38275,
  tirageType: TirageType['MATIN'],
  pic3: 'Multi-tiered executive value-added',
  dateTransaction: dayjs('2023-03-03T17:41'),
};

export const sampleWithFullData: IDayTirageChad = {
  id: 37357,
  tirageType: TirageType['MIDI'],
  dateInString: 'red Kentucky Director',
  premierLot: 'SCSI hybrid',
  deuxiemeLot: 'Avon Games Internal',
  troisiemeLot: 'withdrawal Switchable Bedfordshire',
  pic3: 'Cambridgeshire Virginia',
  win4: 'SAS',
  dateTransaction: dayjs('2023-03-03T07:25'),
};

export const sampleWithNewData: NewDayTirageChad = {
  tirageType: TirageType['APRESMIDI'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
