import { getProductById } from '~~/server/models/product.model'
import { getVineyardById } from '~~/server/models/vineyard.model'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const product = getProductById(id!)
  
  if (!product) {
    throw createError({ statusCode: 404, message: 'Producto no encontrado' })
  }

  const vineyard = getVineyardById(product.vineyardId)
  
  return {
    ...product,
    vineyard // Include vineyard data
  }
})