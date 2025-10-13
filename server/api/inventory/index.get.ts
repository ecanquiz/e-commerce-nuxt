import { inventoryService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const products = await inventoryService.getProducts()
    return products
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting all inventory items'
    })
  }
})
