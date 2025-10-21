import { inventoryService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const authorization = getHeader(event, 'authorization');   
    if (!authorization) {
      throw createError({ 
        statusCode: 401,
        message: 'Authorization required'
      });
    }
    // Transparent proxy: passing everything directly to Nest
    return await inventoryService.getProducts(authorization)
  } catch (error: any) {
    // Resend the exact error from Nest to Nest
    console.error('🔐 [Nitro] Get products proxy error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting all inventory items'
    })
  }
})
