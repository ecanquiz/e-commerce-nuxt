import type { CartItem, User } from '~~/shared/types'

// Mock carts per user (in production you would use a DB)
const userCarts = new Map<string, CartItem[]>()

export const getCart = (userId: string): CartItem[] => {
  return userCarts.get(userId) || []
}

export const updateCart = (userId: string, items: CartItem[]) => {
  userCarts.set(userId, items)
  return getCart(userId)
}

// Helper to calculate total
export const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0)
}