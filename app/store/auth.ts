//import { defineStore } from 'pinia'
import { useCartStore } from '~/store/cart';
import type { User } from '~~/shared/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Omit<User, 'password' | 'createdAt'> | null>(null)
  const token = useCookie('auth_token')
  const isAuthenticated = computed(() => !!user.value)

  // Hydrate from cookie in SSR
  const hydrateFromCookie = () => {
    if (import.meta.server && token.value) {
      // Extract basic user from the token (actually JWT should be decoded)
      const tokenParts = token.value.split('.')
      if (tokenParts.length > 1) {
        user.value = {
          id: tokenParts[1] as string, // ID Simulation
          email: '',
          name: '',
          role: 'customer'
        }  // User simulation
      }
    }
  } 

  // Login
  const login = async (credentials: { email: string; password: string }) => {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })

    if (error.value) throw error.value

    user.value = data.value?.user as User || null
    token.value = data.value?.token || null
    
    // Migrate guest cart if it exists
    const cartStore = useCartStore()
    await cartStore.migrateGuestCart()
  }

  // Logout
  const logout = async () => {
    await useFetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    token.value = null
    
    // Clear cart
    const cartStore = useCartStore()
    await cartStore.clearCart()
  }

  // Load full user
  const loadUser = async () => {
    if (token.value) {
      try {
        const { data } = await useFetch('/api/auth/user')
        user.value = data.value?.user as User || null
      } catch (error) {
        // Invalid token, clear
        token.value = null
        user.value = null
      }
    }
  }

  // Hydrate when starting
  hydrateFromCookie()

  return { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    loadUser 
  }
});
