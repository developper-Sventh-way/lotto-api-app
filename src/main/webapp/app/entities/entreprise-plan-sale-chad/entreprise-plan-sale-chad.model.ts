import dayjs from 'dayjs/esm';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { IEntreprisePlanChad } from 'app/entities/entreprise-plan-chad/entreprise-plan-chad.model';
import { PlanStatut } from 'app/entities/enumerations/plan-statut.model';

export interface IEntreprisePlanSaleChad {
  id: number;
  token?: string | null;
  startDate?: dayjs.Dayjs | null;
  expirateDate?: dayjs.Dayjs | null;
  statut?: PlanStatut | null;
  entreprise?: Pick<IEntrepriseChad, 'id'> | null;
  entreprisePlan?: Pick<IEntreprisePlanChad, 'id'> | null;
}

export type NewEntreprisePlanSaleChad = Omit<IEntreprisePlanSaleChad, 'id'> & { id: null };
