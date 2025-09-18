import { productService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const { vineyardId } = event.context.params!
    const products = await productService.getProductsByVineyard(vineyardId)
    return products
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al obtener productos del viñedo'
    })
  }
})
