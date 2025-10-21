import { inventoryService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Product ID is required'
      })
    }

    const authorization = getHeader(event, 'authorization')
    if (!authorization) {
      throw createError({ 
        statusCode: 401,
        message: 'Authorization required'
      })
    }

    return await inventoryService.getProductInventory(id, authorization)
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting product inventory'
    })
  }
})
