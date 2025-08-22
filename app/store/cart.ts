// import { defineStore } from 'pinia'
import type { CartItem, Product, Vineyard } from '~~/shared/types'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref(false)
  const auth = useAuthStore()
  
  const total = computed(() => 
    items.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  )

  const itemCount = computed(() => 
    items.value.reduce((count, item) => count + item.quantity, 0)
  )

  // Load initial cart
  const loadCart = async () => {    
    loading.value = true
    try {
      if (auth.isAuthenticated) {
        const { data } = await useFetch('/api/cart')
        items.value = data.value?.items || []
      } else {
        const guestCart = localStorage.getItem('guest-cart')
        items.value = guestCart ? JSON.parse(guestCart) : []
      }
    } finally {
      loading.value = false
    }
  }

  // Add item to cart
  const addItem = async (product: Product, vineyard: Vineyard, quantity: number = 1) => {
    if (!auth.isAuthenticated) {
      // Modo guest
      const existingItem = items.value.find(item => 
        item.product.id === product.id && item.vineyard?.id === vineyard.id
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        items.value.push({ product, vineyard, quantity })
      }
      
      localStorage.setItem('guest-cart', JSON.stringify(items.value))
      return
    }

    // Authenticated user
    if (product.stock < quantity) {
      throw new Error('Stock insuficiente')
    }

    const existingItem = items.value.find(
      item => item.product.id === product.id && item.vineyard?.id === vineyard.id
    )

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity
      if (newQuantity > product.stock) {
        throw new Error('No hay suficiente stock')
      }
      existingItem.quantity = newQuantity
    } else {
      items.value.push({ product, vineyard, quantity })
    }
    
    await syncCart()
  }

  // Update quantity
  const updateQuantity = async (productId: string, vineyardId: string, quantity: number) => {
    const item = items.value.find(item => 
      item.product.id === productId && item.vineyard?.id === vineyardId
    )
    
    if (item) {
      if (quantity <= 0) {
        await removeItem(productId, vineyardId)
        return
      }
      
      if (auth.isAuthenticated && quantity > item.product.stock) {
        throw new Error('No hay suficiente stock')
      }
      
      item.quantity = quantity
      
      if (auth.isAuthenticated) {
        await syncCart()
      } else {
        localStorage.setItem('guest-cart', JSON.stringify(items.value))
      }
    }
  }

  // Delete item
  const removeItem = async (productId: string, vineyardId: string) => {
    items.value = items.value.filter(item => 
      !(item.product.id === productId && item.vineyard?.id === vineyardId)
    )
    
    if (auth.isAuthenticated) {
      await syncCart()
    } else {
      localStorage.setItem('guest-cart', JSON.stringify(items.value))
    }
  }

  // Synchronize with server
  const syncCart = async () => {    
    loading.value = true
    try {
      await useFetch('/api/cart/update', {
        method: 'POST',
        body: { items: items.value }
      })
    } finally {
      loading.value = false
    }
  }

  // Clear cart
  const clearCart = async () => {
    items.value = []
    
    if (auth.isAuthenticated) {
      await syncCart()
    } else {
      localStorage.removeItem('guest-cart')
    }
  }

  // Migrate cart from guest to user
  const migrateGuestCart = async () => {
    const guestCart = localStorage.getItem('guest-cart')
    if (guestCart) {
      const guestItems: CartItem[] = JSON.parse(guestCart)
      items.value = guestItems
      await syncCart()
      localStorage.removeItem('guest-cart')
    }
  }

  return {
    items,
    total,
    itemCount,
    loading,
    loadCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    migrateGuestCart
  }
})