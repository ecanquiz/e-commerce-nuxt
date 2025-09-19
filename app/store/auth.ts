//import { defineStore } from 'pinia'
import { useCartStore } from '~/store/cart';
import type { User } from '~~/shared/types'

interface RegisterData {
  name: string
  email: string
  password: string
  role: 'customer'
  phone?: string
  birthDate?: string
  location?: string
  description?: string
  preferences?: {
    wineTypes: string[]
    notifications: boolean
    newsletter: boolean
  }
}

export interface AuthResponse {
  user: User
  token: string
  message?: string
}

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
    const { data, error } = await useFetch<AuthResponse>('/api/auth/login', {
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

  const loginWithGoogle = async () => {
    // Implementar autenticación con Google
  };

  // Register
  const register = async (userData: RegisterData) => {
    const { data, error } = await useFetch<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: userData
    })

    if (error.value) {
      throw new Error(error.value.data?.message || 'Registration failed')
    }

    user.value = data.value?.user as User || null
    token.value = data.value?.token || null
    
    // Migrate guest cart if it exists
    const cartStore = useCartStore()
    await cartStore.migrateGuestCart()

    return data.value
  }


  // Logout
  const logout = async () => {
    try {
      await useFetch('/api/auth/logout', { 
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
    } catch (error) {
      console.error('Logout error:', error)
      // We continue with the local logout even if there is an error on the server
    } finally {
      // We always clean up the local state
      user.value = null
      token.value = null
      
      const cartStore = useCartStore()
      await cartStore.clearCart()
    }
  }

  // Load full user
  const loadUser = async () => {
    if (token.value) {
      try {
        const { data } = await useFetch<AuthResponse>('/api/auth/user')
        user.value = data.value?.user as User || null
      } catch (error) {
        // Invalid token, clear
        token.value = null
        user.value = null
      }
    }
  }

  const forgotPassword = async (email: string): Promise<{ message: string }> => {
    try {
      const { data, error } = await useFetch('/api/auth/forgot-password', {
        method: 'POST',
        body: { email }
      })

      if (error.value) {
        throw new Error(error.value.data?.message || 'Error requesting password reset')
      }

      return data.value as { message: string };
    } catch (error) {
      console.error('Password recovery error:', error);
      throw error;
    }
  }

  const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const { data, error } = await useFetch('/api/auth/reset-password', {
        method: 'POST',
        body: { token, newPassword }
      })

      if (error.value) {
        throw new Error(error.value.data?.message || 'Error resetting password')
      }

      return data.value as { message: string }
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  // Hydrate when starting
  hydrateFromCookie()

  return { 
    user, 
    isAuthenticated, 
    login,
    loginWithGoogle,
    logout, 
    loadUser,
    register,
    forgotPassword,
    resetPassword
  }
});
