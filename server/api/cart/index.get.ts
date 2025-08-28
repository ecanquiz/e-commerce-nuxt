import { cartService } from '~~/server/services'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireAuth(event)
    const items = await cartService.getCart(user.id)
    const total = await cartService.calculateTotal(items)
    
    return {
      items,
      total,
      user: {
        name: user.name,
        email: user.email
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al obtener carrito'
    })
  }
})
