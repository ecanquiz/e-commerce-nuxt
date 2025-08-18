import { getCart } from '~~/server/models/cart.model'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  // Authentication middleware
  const { user } = requireAuth(event)
  
  // Endpoint logic...
  return { 
    items: getCart(user.id),
    user: { 
      name: user.name,
      email: user.email 
    }
  }
})