import type { Product } from '~~/shared/types'

// Datos mock de ejemplo (reemplaza con tus datos reales)
export const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Catena Zapata Malbec',
        description: 'Un Malbec excepcional de viñedos de altura que expresa la elegancia y complejidad de este terroir único.',
        price: 15000,
        category: 'red',
        vintage: 2020,
        alcoholContent: 14.5,
        volume: 750,
        stock: 25,
        image: 'https://images.pexels.com/photos/10039989/pexels-photo-10039989.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/237774/pexels-photo-237774.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Notas de frutas negras, especias y taninos elegantes',
        food_pairing: ['Carnes rojas', 'Quesos maduros', 'Chocolate negro'],
        awards: ['Wine Spectator 95 pts', 'Robert Parker 94 pts'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
      {
        id: '2',
        name: 'Catena Zapata Chardonnay',
        description: 'Chardonnay de viñedos de altura con fermentación en barricas francesas, equilibrio perfecto entre frescura y complejidad.',
        price: 12000,
        category: 'white',
        vintage: 2021,
        alcoholContent: 13.5,
        volume: 750,
        stock: 18,
        image: 'https://images.pexels.com/photos/2954924/pexels-photo-2954924.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Aromas cítricos, notas de vainilla y final mineral',
        food_pairing: ['Pescados', 'Mariscos', 'Pollo'],
        awards: ['Wine Advocate 92 pts'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
      {
        id: '3',
        name: 'Norton Reserva Malbec',
        description: 'Malbec de gran estructura y elegancia, con crianza en barricas francesas que le otorga complejidad y suavidad.',
        price: 8500,
        category: 'red',
        vintage: 2019,
        alcoholContent: 14.0,
        volume: 750,
        stock: 32,
        image: 'https://images.pexels.com/photos/26834221/pexels-photo-26834221.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Frutas rojas maduras, especias dulces y taninos redondos',
        food_pairing: ['Asado', 'Cordero', 'Pastas'],
        awards: ['Decanter Bronze Medal'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
      {
        id: '4',
        name: 'Rutini Cabernet Sauvignon',
        description: 'Cabernet Sauvignon de excelente estructura y concentración, con notas de frutas negras y especias.',
        price: 11000,
        category: 'red',
        vintage: 2020,
        alcoholContent: 14.2,
        volume: 750,
        stock: 22,
        image: 'https://images.pexels.com/photos/15745876/pexels-photo-15745876.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Cassis, cedro, especias y taninos firmes',
        food_pairing: ['Carnes rojas', 'Cordero', 'Quesos duros'],
        awards: ['Tim Atkin 93 pts'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
       {
        id: '5',
        name: 'Alamos Malbec',
        description: 'Malbec joven y fresco que expresa la tipicidad varietal con frutas rojas vibrantes y taninos suaves.',
        price: 4500,
        category: 'red',
        vintage: 2021,
        alcoholContent: 13.8,
        volume: 750,
        stock: 45,
        image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Frutas rojas frescas, especias suaves y final sedoso',
        food_pairing: ['Pizza', 'Hamburguesas', 'Pasta con salsa roja'],
        awards: [],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
      {
        id: '6',
        name: 'Salentein Primus Malbec',
        description: 'Malbec premium de viñedos seleccionados, con crianza en barricas francesas que le otorga complejidad excepcional.',
        price: 18000,
        category: 'red',
        vintage: 2019,
        alcoholContent: 14.8,
        volume: 750,
        stock: 15,
        image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Frutas negras concentradas, especias complejas y taninos nobles',
        food_pairing: ['Cordero patagónico', 'Bife de chorizo', 'Quesos de cabra'],
        awards: ['Wine Spectator 94 pts', 'James Suckling 95 pts'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
      {
        id: '7',
        name: 'Luigi Bosca Malbec DOC',
        description: 'Malbec de denominación de origen controlada, expresión pura del terroir de Luján de Cuyo.',
        price: 9500,
        category: 'red',
        vintage: 2020,
        alcoholContent: 14.3,
        volume: 750,
        stock: 28,
        image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Violetas, ciruelas, especias y mineralidad',
        food_pairing: ['Milanesas', 'Empanadas', 'Chorizo'],
        awards: ['Mundus Vini Gold Medal'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
      
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
