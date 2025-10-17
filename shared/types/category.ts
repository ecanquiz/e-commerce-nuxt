export interface Category {
  id: string
  name: string
  description: string
  type: 'product' | 'service' // To scale to other types
  created_at: string
  updated_at: string
}

export type WineCategory = 'red' | 'white' | 'rose' | 'sparkling' | 'dessert'
export type ServiceCategory = 'tasting' | 'tour' | 'event' | 'restaurant' | 'direct_sale' | 'accommodation'

export const WINE_CATEGORIES: Record<WineCategory, string> = {
  red: 'Tinto',
  white: 'Blanco', 
  rose: 'Rosado',
  sparkling: 'Espumoso',
  dessert: 'Dulce'
}

export const SERVICE_CATEGORIES: Record<ServiceCategory, string> = {
  tasting: 'Degustación',
  tour: 'Recorrido',
  event: 'Evento',
  restaurant: 'Restaurante',
  direct_sale: 'Venta directa',
  accommodation: 'Alojamiento'
}
