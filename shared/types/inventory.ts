export interface Category {
  id: string
  name: string
  description: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  category_id: string
  vintage_year: number
  alcohol_content: number
  grape_variety: string
  region: string
  price: number
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
  category?: Category
}

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