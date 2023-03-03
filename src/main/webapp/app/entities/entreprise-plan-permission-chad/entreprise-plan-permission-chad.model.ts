import { IEntreprisePlanChad } from 'app/entities/entreprise-plan-chad/entreprise-plan-chad.model';
import { IStateChad } from 'app/entities/state-chad/state-chad.model';

export interface IEntreprisePlanPermissionChad {
  id: number;
  description?: string | null;
  entreprisePlan?: Pick<IEntreprisePlanChad, 'id'> | null;
  state?: Pick<IStateChad, 'id'> | null;
}

export type NewEntreprisePlanPermissionChad = Omit<IEntreprisePlanPermissionChad, 'id'> & { id: null };
