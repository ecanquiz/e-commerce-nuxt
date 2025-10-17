import { productService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    // Transparent proxy: passing everything directly
    return await productService.getAllProducts();
  } catch (error: any) {
    // Resend the exact error from Nest to Nest
    console.error('🔐 [Nitro] Get all products proxy error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting products'
    })
  }
})
