export interface PopulatedCategory {
  name: string;
}

export interface ProductWithCategory {
  _id: string;
  name: string;
  price: number;
  stock?: string;
  categoryId?: PopulatedCategory | null;
}
