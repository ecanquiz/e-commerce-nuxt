import { defineStore } from 'pinia'
import type { CartItem, Product, Vineyard } from '~~/shared/types'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', () => {
  // const guestCart = useLocalStorage<CartItem[]>('guest-cart', [])

  const items = ref<CartItem[]>([])
  const loading = ref(false)
  const auth = useAuthStore()
  
  // Total computed
  const total = computed(() => 
    items.value.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0)
  )

  // Total number of items
  const itemCount = computed(() => 
    items.value.reduce((count, item) => count + item.quantity, 0)
  )

  // Load cart from server
  const loadCart = async () => {    
    loading.value = true
    try {
      if (auth.isAuthenticated) {
        const { data } = await useFetch('/api/cart')
        items.value = data.value?.items || []
      } else { // items.value = guestCart.value
        return; 
     }
    } finally {
      loading.value = false
    }
  }

  // Add product to cart
  const addItem = async (product: Product, quantity: number = 1) => {
    if (!auth.isAuthenticated) {
      //return navigateTo('/login?redirect=' + route.path)
      return navigateTo('/login?redirect=/products')
    }

    // Check stock
    if (product.stock < quantity) {
      throw new Error('Stock insuficiente')
    }

    const existingItem = items.value.find(
      item => item.product.id === product.id
    )

    if (existingItem) {
      // Do not exceed available stock
      const newQuantity = existingItem.quantity + quantity
      if (newQuantity > product.stock) {
        throw new Error('No hay suficiente stock')
      }
      existingItem.quantity = newQuantity
    } else {
      items.value.push({ 
        product,
        //vineyard: product.vineyard, // Make sure the product comes from the vineyard
        quantity
      })
    }
    await syncCart()
  }

  // Synchronize with the server
  const syncCart = async () => {    
    loading.value = true
    try {
      if (auth.isAuthenticated) {
        await useFetch('/api/cart/update', {
          method: 'POST',
          body: { items: items.value }
        })
      } else { // guestCart.value = items.value
        return;
      }
    } finally {
      loading.value = false
    }
  }

  // Clear cart
  const clearCart = async () => {
    items.value = []
    await syncCart()
  }

  return {
    items,
    total,
    itemCount,
    loading,
    loadCart,
    addItem,
    removeItem: async (productId: string) => {
      items.value = items.value.filter(item => item.product.id !== productId)
      await syncCart()
    },
    clearCart
  }
})
