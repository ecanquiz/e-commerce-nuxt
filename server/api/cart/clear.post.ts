import { cartService } from '~~/server/services'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireAuth(event)
    
    await cartService.clearCart(user.id)
    
    return {
      success: true,
      message: 'Carrito vaciado correctamente'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al vaciar carrito'
    })
  }
})
