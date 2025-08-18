import type { Product, Vineyard } from '~/types'

// Datos mock de ejemplo (reemplaza con tus datos reales)
export const mockProducts: Product[] = [
  {
    id: '101',
    vineyardId: '1',
    name: 'Malbec Reserva',
    description: 'Vino tinto con cuerpo...',
    price: 25.99,
    category: 'red',
    vintage: 2020,
    volume: 0, // ml
    alcoholContent: 14.5,
    stock: 100,
    image: '/images/malbec.jpg',
    images: [],
    stockHistory: [],
    tasting_notes: 'Frutos rojos, chocolate...',
    food_pairing: [],
    awards: [],
    createdAt: '2023-01-15'
  }
]

// Helper para buscar productos
export const getProductById = (id: string) => 
  mockProducts.find(p => p.id === id)

export const searchProducts = (query: string, category?: string) => {
  return mockProducts.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || 
                         p.description.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = !category || category === 'all' || p.category === category
    return matchesQuery && matchesCategory
  })
}


