import type { Product } from "./product"

export interface Inventory {
  id: string
  product_id: string
  current_stock: number
  reserved_stock: number
  minimum_stock: number
  maximum_stock: number
  last_updated: string
  updated_by: string
  product?: Product
}

export interface ProductWithInventory extends Product {
  inventory?: Inventory
}

export type StockUpdate = Partial<Inventory>