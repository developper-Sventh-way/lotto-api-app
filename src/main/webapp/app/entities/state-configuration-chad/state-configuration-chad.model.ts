import { IStateChad } from 'app/entities/state-chad/state-chad.model';
import { ConfigStatut } from 'app/entities/enumerations/config-statut.model';

export interface IStateConfigurationChad {
  id: number;
  startHour?: string | null;
  endHour?: string | null;
  statut?: ConfigStatut | null;
  state?: Pick<IStateChad, 'id'> | null;
}

export type NewStateConfigurationChad = Omit<IStateConfigurationChad, 'id'> & { id: null };
