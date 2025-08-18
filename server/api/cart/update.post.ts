import { updateCart, calculateTotal } from '~~/server/models/cart.model'

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event)
  const body = await readBody(event)
  
  const updatedCart = updateCart(auth.user.id, body.items)
  
  return {
    items: updatedCart,
    total: calculateTotal(updatedCart),
    success: true
  }
})