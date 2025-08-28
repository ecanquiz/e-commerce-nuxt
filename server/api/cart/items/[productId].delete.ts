import { cartService } from '~~/server/services'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireAuth(event)
    const { productId } = event.context.params!

    const updatedCart = await cartService.removeFromCart(user.id, productId)
    const total = await cartService.calculateTotal(updatedCart)
    
    return {
      items: updatedCart,
      total,
      success: true
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al eliminar del carrito'
    })
  }
})
