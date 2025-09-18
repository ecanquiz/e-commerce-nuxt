import { productService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params!
    const product = await productService.getProductById(id)
    return product
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al obtener producto'
    })
  }
})
