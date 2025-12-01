export type Category = 'hat' | 'shirt' | 'jeans' | 'boots' | 'belt';

export interface Product {
  id: string;
  category: Category;
  brand: string;
  name: string;
  price: number;
  image: string;
  description: string; // Used for the AI prompt
}

export interface SelectedOutfit {
  hat?: Product;
  shirt?: Product;
  jeans?: Product;
  boots?: Product;
  belt?: Product;
}

export type AppStep = 'upload' | 'select' | 'result';