import { inventoryService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Required product ID is missing'
      })
    }

    const authorization = getHeader(event, 'authorization'); 
    if (!authorization) {
      throw createError({ 
        statusCode: 401,
        message: 'Authorization required'
      });
    }
    // Transparent proxy: passing everything directly to Nest
    await inventoryService.deleteProduct(id, authorization);
    return { success: true, message: 'Producto eliminado exitosamente' }
  } catch (error: any) {
    // Resend the exact error from Nest to Nest
    console.error('🔐 [Nitro] Delete product proxy error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error deleting product'
    })
  }
})
