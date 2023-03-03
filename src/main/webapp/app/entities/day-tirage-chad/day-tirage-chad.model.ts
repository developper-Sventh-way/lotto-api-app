import dayjs from 'dayjs/esm';
import { IStateChad } from 'app/entities/state-chad/state-chad.model';
import { TirageType } from 'app/entities/enumerations/tirage-type.model';

export interface IDayTirageChad {
  id: number;
  tirageType?: TirageType | null;
  dateInString?: string | null;
  premierLot?: string | null;
  deuxiemeLot?: string | null;
  troisiemeLot?: string | null;
  pic3?: string | null;
  win4?: string | null;
  dateTransaction?: dayjs.Dayjs | null;
  state?: Pick<IStateChad, 'id'> | null;
}

export type NewDayTirageChad = Omit<IDayTirageChad, 'id'> & { id: null };
