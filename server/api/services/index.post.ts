import { productService } from '~~/server/services'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireAuth(event)
    const body = await readBody(event)
    
    // Verificar permisos (solo vineyard o admin)
    if (user.role !== 'vineyard' && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Access denied'
      })
    }
    
    const product = await productService.createProduct(body, user.id)
    return product
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al crear producto'
    })
  }
})
