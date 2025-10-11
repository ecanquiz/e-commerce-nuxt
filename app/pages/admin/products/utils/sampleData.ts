import { dataService } from '../services/dataService'

export const createSampleProducts = async () => {
  const sampleProducts = [
    {
      name: 'Reserva Cabernet Sauvignon 2021',
      description: 'Vino tinto de cuerpo completo con notas de cassis, cedro y vainilla. Envejecido 12 meses en barricas de roble francés.',
      category_id: '1', // Tinto
      vintage_year: 2021,
      alcohol_content: 14.5,
      grape_variety: 'Cabernet Sauvignon',
      region: 'Valle de Uco, Mendoza',
      price: 45.99,
      image_url: 'https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg',
      is_active: true
    },
    {
      name: 'Chardonnay Premium 2022',
      description: 'Vino blanco elegante con aromas florales y cítricos, con un toque mineral y final persistente.',
      category_id: '2', // Blanco
      vintage_year: 2022,
      alcohol_content: 13.0,
      grape_variety: 'Chardonnay',
      region: 'Valle de Casablanca, Chile',
      price: 32.50,
      image_url: 'https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg',
      is_active: true
    },
    {
      name: 'Rosé de Malbec 2023',
      description: 'Rosado fresco y afrutado, ideal para aperitivos y comidas ligeras. Notas de fresa y durazno.',
      category_id: '3', // Rosado
      vintage_year: 2023,
      alcohol_content: 12.5,
      grape_variety: 'Malbec',
      region: 'San Rafael, Mendoza',
      price: 28.75,
      image_url: 'https://images.pexels.com/photos/1170099/pexels-photo-1170099.jpeg',
      is_active: true
    },
    {
      name: 'Espumante Brut Nature',
      description: 'Espumante método tradicional, sin dosaje. Burbujas finas y persistentes con notas cítricas.',
      category_id: '4', // Espumoso
      vintage_year: 2020,
      alcohol_content: 12.0,
      grape_variety: 'Chardonnay, Pinot Noir',
      region: 'Patagonia, Argentina',
      price: 55.00,
      image_url: 'https://images.pexels.com/photos/5946984/pexels-photo-5946984.jpeg',
      is_active: true
    }
  ]

  try {
    for (const product of sampleProducts) {
      await dataService.createProduct(product)
      console.log(`Created product: ${product.name}`)
    }

    // Add some stock to the products
    const products = await dataService.getProducts()
    for (const product of products) {
      const randomStock = Math.floor(Math.random() * 50) + 10 // Between 10 and 60
      await dataService.updateInventory(product.id, {
        current_stock: randomStock,
        minimum_stock: 15,
        maximum_stock: 100,
        updated_by: 'system - sample data'
      })
      console.log(`Added ${randomStock} stock to ${product.name}`)
    }

    console.log('Sample data created successfully!')
    return true
  } catch (error) {
    console.error('Error creating sample data:', error)
    return false
  }
}