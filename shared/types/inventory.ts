import type { Product } from "./product"

export interface Inventory {
  id: string;
  product_id: string;
  current_stock: number;
  reserved_stock: number;
  minimum_stock: number;
  maximum_stock: number;
  last_updated: string;
  updated_by: string;
}

export interface StockMovement {
  id: string;
  product_id: string;
  type: 'in' | 'out' | 'adjustment' | 'reserved' | 'released';
  quantity: number;
  previous_stock: number
  new_stock: number
  reason: string;
  reference_id?: string // order_id, adjustment_id, etc.
  created_at: string
  created_by: string
}

// export type StockUpdate = Partial<Inventory>
export interface StockUpdate {
  current_stock?: number
  minimum_stock?: number
  maximum_stock?: number
  updated_by: string
}

export interface ProductWithInventory extends Product {
  inventory?: Inventory
  stock_movements?: StockMovement[]
}
