import type { Product, ProductLegacy, ProductWithInventory } from '../types'

export const productToLegacy = (product: ProductWithInventory): ProductLegacy => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  category: product.category?.name as any, // Parse as needed
  vintage: product.vintage_year,
  alcoholContent: product.alcohol_content,
  volume: product.volume,
  stock: product.inventory?.current_stock || 0,
  stockHistory: [], // It would be populated from stock_movements
  image: product.image_url,
  images: product.images,
  tasting_notes: product.tasting_notes,
  food_pairing: product.food_pairing,
  awards: product.awards,
  createdAt: product.created_at,
  updatedAt: product.updated_at,
  status: product.is_active ? 'active' : 'inactive'
})

export const legacyToProduct = (legacy: ProductLegacy): Omit<Product, 'id' | 'created_at' | 'updated_at'> => ({
  name: legacy.name,
  description: legacy.description,
  category_id: '', // You would need to parse category to category_id
  vintage_year: legacy.vintage,
  alcohol_content: legacy.alcoholContent,
  grape_variety: '', // To be defined
  region: '', // To be defined
  volume: legacy.volume,
  price: legacy.price,
  image_url: legacy.image,
  images: legacy.images,
  tasting_notes: legacy.tasting_notes,
  food_pairing: legacy.food_pairing,
  awards: legacy.awards,
  is_active: legacy.status !== 'inactive'
})