import { cartService } from '~~/server/services'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireAuth(event);
    const { productId } = event.context.params!;

    if (!productId) {
      throw createError({
        statusCode: 400,
        message: 'Product id required'
      });
    }

    const updatedCart = await cartService.removeFromCart(user.id, productId);
    const total = await cartService.calculateTotal(updatedCart);
    
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
