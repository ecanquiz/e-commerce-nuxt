import { mockVineyards } from '~~/server/models/vineyard.model'

export default defineEventHandler(async (event) => {  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    data: mockVineyards,
    meta: { total: mockVineyards.length }
  }
})
