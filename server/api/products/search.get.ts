import { searchProducts } from '~~/server/models/product.model'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const results = searchProducts(
    query.q as string, 
    query.category as string | undefined
  )
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return { 
    data: results.slice(0, 10), // Limit results
    meta: { total: results.length }
  }
})