import { TypePlan } from 'app/entities/enumerations/type-plan.model';

export interface IEntreprisePlanChad {
  id: number;
  prix?: number | null;
  name?: string | null;
  type?: TypePlan | null;
  avantage?: string | null;
  requestPerDay?: number | null;
}

export type NewEntreprisePlanChad = Omit<IEntreprisePlanChad, 'id'> & { id: null };
