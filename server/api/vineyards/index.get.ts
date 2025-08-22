import { mockVineyards } from '~~/server/models/vineyard.model'

export default defineEventHandler(async (event) => {  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    data: mockVineyards,
    meta: { total: mockVineyards.length }
  }
})


/*
TODO: Enrich products with vineyard information

import { mockVineyards } from '~~/server/models/vineyard.model'

export default defineEventHandler(async (event) => {  
  // Solo simular delay en desarrollo
  if (process.dev) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  // Enrich products with vineyard information
  const enrichedVineyards = mockVineyards.map(vineyard => ({
    ...vineyard,
    products: vineyard.products.map(product => ({
      ...product,
      vineyard: {
        id: vineyard.id,
        name: vineyard.name,
        location: vineyard.location
      }
    }))
  }))

  return {
    data: enrichedVineyards,
    meta: { 
      total: mockVineyards.length,
      timestamp: new Date().toISOString()
    }
  }
})*/