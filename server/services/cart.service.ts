export interface CartService {
  getCart(userId: string): Promise<any[]>
  updateCart(userId: string, items: any[]): Promise<any[]>
  addToCart(userId: string, productId: string, quantity: number): Promise<any[]>
  removeFromCart(userId: string, productId: string): Promise<any[]>
  clearCart(userId: string): Promise<void>
  calculateTotal(items: any[]): Promise<number>
}

// Mock implementation - BASADO EN TU CÓDIGO ACTUAL
export class MockCartService implements CartService {
  private userCarts = new Map<string, any[]>()

  async getCart(userId: string) {
    // Simular delay de API
    if (import.meta.dev) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return this.userCarts.get(userId) || []
  }

  async updateCart(userId: string, items: any[]) {
    // Validar items
    if (!Array.isArray(items)) {
      throw createError({
        statusCode: 400,
        message: 'Items must be an array'
      })
    }

    // Validar cada item
    for (const item of items) {
      if (!item.product || !item.quantity) {
        throw createError({
          statusCode: 400,
          message: 'Each item must have product and quantity'
        })
      }
    }

    this.userCarts.set(userId, items)
    
    // Simular delay de API
    if (import.meta.dev) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return this.getCart(userId)
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const { getProductById } = await import('~~/server/models/product.model')
    const { mockVineyards } = await import('~~/server/models/vineyard.model')
    
    const product = getProductById(productId)
    if (!product) {
      throw createError({
        statusCode: 404,
        message: 'Product not found'
      })
    }

    if (quantity <= 0) {
      throw createError({
        statusCode: 400,
        message: 'Quantity must be greater than 0'
      })
    }

    const currentCart = await this.getCart(userId)
    const existingItemIndex = currentCart.findIndex(item => item.product.id === productId)

    let newCart: any[]
    
    if (existingItemIndex !== -1) {
      // Actualizar cantidad existente
      newCart = [...currentCart]
      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantity: newCart[existingItemIndex].quantity + quantity
      }
    } else {
      // Añadir nuevo item
      const vineyard = mockVineyards.find(v => v.id === product.vineyardId)
      newCart = [
        ...currentCart,
        {
          product: {
            ...product,
            vineyard: vineyard ? {
              id: vineyard.id,
              name: vineyard.name,
              location: vineyard.location
            } : undefined
          },
          quantity
        }
      ]
    }

    return this.updateCart(userId, newCart)
  }

  async removeFromCart(userId: string, productId: string) {
    const currentCart = await this.getCart(userId)
    const newCart = currentCart.filter(item => item.product.id !== productId)
    
    return this.updateCart(userId, newCart)
  }

  async clearCart(userId: string) {
    this.userCarts.set(userId, [])
    
    // Simular delay de API
    if (import.meta.dev) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  async calculateTotal(items: any[]) {
    // Simular cálculo
    if (import.meta.dev) {
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }
}

// Nest implementation - PARA EL FUTURO
export class NestCartService implements CartService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEST_API_URL || 'http://localhost:3001'
  }

  async getCart(userId: string) {
    const response = await $fetch(`${this.baseUrl}/cart`, {
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response as unknown as Promise<any[]>
  }

  async updateCart(userId: string, items: any[]) {
    const response = await $fetch(`${this.baseUrl}/cart`, {
      method: 'PUT',
      body: { items },
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response as unknown as Promise<any[]>
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const response = await $fetch(`${this.baseUrl}/cart/items`, {
      method: 'POST',
      body: { productId, quantity },
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response as unknown as Promise<any[]>
  }

  async removeFromCart(userId: string, productId: string) {
    const response = await $fetch(`${this.baseUrl}/cart/items/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response as unknown as Promise<any[]>
  }

  async clearCart(userId: string) {
    await $fetch(`${this.baseUrl}/cart`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userId}` }
    })
  }

  async calculateTotal(items: any[]) {
    // En Nest, el cálculo podría hacerse en el backend
    const response = await $fetch<Promise<any>>(`${this.baseUrl}/cart/calculate-total`, {
      method: 'POST',
      body: { items }
    })

    return response.total as unknown as Promise<number>
  }
}
