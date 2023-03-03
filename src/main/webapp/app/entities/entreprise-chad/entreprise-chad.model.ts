export interface IEntrepriseChad {
  id: number;
  name?: string | null;
  representant?: string | null;
  cin?: string | null;
  nif?: string | null;
}

export type NewEntrepriseChad = Omit<IEntrepriseChad, 'id'> & { id: null };
