import { cartService } from '~~/server/services'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireAuth(event)
    const body = await readBody(event)
    const { productId, quantity = 1 } = body

    if (!productId) {
      throw createError({
        statusCode: 400,
        message: 'Product ID is required'
      })
    }

    const updatedCart = await cartService.addToCart(user.id, productId, quantity)
    const total = await cartService.calculateTotal(updatedCart)
    
    return {
      items: updatedCart,
      total,
      success: true
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al añadir al carrito'
    })
  }
})
