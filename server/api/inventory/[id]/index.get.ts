import { inventoryService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Required product ID is missing'
      })
    }

    const product = await inventoryService.getProduct(id)
    if (!product) {
      throw createError({
        statusCode: 404,
        message: 'Product not found'
      })
    }

    return product
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting the product'
    })
  }
})
