export interface IStateChad {
  id: number;
  name?: string | null;
}

export type NewStateChad = Omit<IStateChad, 'id'> & { id: null };
