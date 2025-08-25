// app/store/cart.ts
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { CartItem, Product, Vineyard } from '~~/shared/types'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', () => {
  const auth = useAuthStore()
  const loading = ref(false)
  
  // SOLUCIÓN: Usar un ref normal y sincronizar manualmente con localStorage
  const items = ref<CartItem[]>([])

  // Cargar desde localStorage solo en cliente
  const loadFromStorage = () => {
    if (process.client) {
      const stored = localStorage.getItem('guest-cart')
      if (stored) {
        items.value = JSON.parse(stored)
      }
    }
  }

  // Guardar en localStorage automáticamente
  watch(items, (newItems) => {
    if (process.client && !auth.isAuthenticated) {
      localStorage.setItem('guest-cart', JSON.stringify(newItems))
    }
  }, { deep: true })

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
        loadFromStorage() // Cargar desde localStorage para guest
      }
    } finally {
      loading.value = false
    }
  }

  // Add item to cart
  const addItem = async (product: Product, vineyard: Vineyard, quantity: number = 1) => {
    if (!auth.isAuthenticated) {
      const existingItem = items.value.find(item => 
        item.product.id === product.id && item.vineyard?.id === vineyard.id
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        items.value.push({ product, vineyard, quantity })
      }
      return
    }

    // Authenticated user
    if (product.stock < quantity) {
      throw new Error('Stock insuficiente')
    }

    const existingItem = items.value.find(item => 
      item.product.id === product.id && item.vineyard && item.vineyard.id === vineyard.id
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
    } else if (process.client) {
      localStorage.removeItem('guest-cart')
    }
  }

  // Migrate cart from guest to user
  const migrateGuestCart = async () => {
    if (process.client) {
      const guestCart = localStorage.getItem('guest-cart')
      if (guestCart) {
        const guestItems: CartItem[] = JSON.parse(guestCart)
        items.value = guestItems
        await syncCart()
        localStorage.removeItem('guest-cart')
      }
    }
  }

  // Cargar inicialmente desde localStorage
  if (process.client) {
    loadFromStorage()
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