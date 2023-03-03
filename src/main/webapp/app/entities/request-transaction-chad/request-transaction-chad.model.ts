import dayjs from 'dayjs/esm';
import { IEntreprisePlanSaleChad } from 'app/entities/entreprise-plan-sale-chad/entreprise-plan-sale-chad.model';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';

export interface IRequestTransactionChad {
  id: number;
  description?: string | null;
  dateTransaction?: dayjs.Dayjs | null;
  entreprisePlanSale?: Pick<IEntreprisePlanSaleChad, 'id'> | null;
  entreprise?: Pick<IEntrepriseChad, 'id'> | null;
}

export type NewRequestTransactionChad = Omit<IRequestTransactionChad, 'id'> & { id: null };
