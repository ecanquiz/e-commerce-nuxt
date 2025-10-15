import type { Category } from "./category"

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  vintage: number;
  alcoholContent: number;
  volume: number;
  stock: number;
  stockHistory: StockMovement[];
  image: string;
  images: string[];
  tasting_notes: string;
  food_pairing: string[];
  awards: string[];
  createdAt: string;
  updatedAt: string
  status?: 'active' | 'inactive' | 'discontinued';
  vintage_year?: number;
  grape_variety?: string;
  region?: string;
  image_url?: string;
  is_active?: boolean
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  orderId?: string;
  createdAt: string;
  createdBy: string;
}