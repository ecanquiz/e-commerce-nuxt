import type { Category, WineCategory } from "./category"
import type { Inventory, StockMovement } from './inventory'

export interface Product {
  id: string;
  name: string;
  description: string;
  category_id: string;
  vintage_year: number;
  alcohol_content: number;
  grape_variety: string;
  region: string;
  volume: number // in milliliters
  price: number;
  image_url: string;
  
  images: string[];
  tasting_notes: string;
  food_pairing: string[];
  awards: string[];

  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  inventory?: Inventory;
}

export interface ProductLegacy {
  id: string;
  name: string;
  description: string;
  price: number;
  category: WineCategory; // category_id
  vintage: number; // vintage_year
  alcoholContent: number; // alcohol_content
  volume: number;
  stock: number; // inventory.current_stock
  stockHistory: StockMovement[]; // separate table
  image: string; // image_url
  images: string[];
  tasting_notes: string;
  food_pairing: string[];
  awards: string[];
  createdAt?: string; // created_at
  updatedAt?: string; // updated_at
  status?: 'active' | 'inactive'; // is_active
}
