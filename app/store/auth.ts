//import { defineStore } from 'pinia'
import { useCartStore } from '~/store/cart';
import type { User } from '~~/shared/types'

interface RegisterData {
  name: string
  email: string
  password: string
  role: 'customer' | 'vineyard'
  phone?: string
  birthDate?: string
  vineyardName?: string
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
  const _isHydrated = ref(false)

  // Hydrate from storage
  const hydrateFromStorage = () => {
    if (import.meta.client && !_isHydrated.value) {
      // Load user from localStorage
      const savedUser = localStorage.getItem('auth_user')
      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser);
          _isHydrated.value = true;
          console.log('User hydrated from localStorage');
        } catch (error) {
          console.error('Error parsing saved user:', error)
          localStorage.removeItem('auth_user')
        }
      }
    }
  }

  const saveUserToStorage = (userData: Omit<User, 'password' | 'createdAt'> | null) => {
    if (import.meta.client) {
      if (userData) {
        localStorage.setItem('auth_user', JSON.stringify(userData))
        console.log('User saved to localStorage')
      } else {
        localStorage.removeItem('auth_user')
        console.log('User removed from localStorage')
      }
    }
  }

  const clearAuthData = () => {
    if (import.meta.client) {
      localStorage.removeItem('auth_user')
    }
    token.value = null
    user.value = null
    _isHydrated.value = false
    console.log('Auth data cleared')
  }

  // Load user from API (to verify valid token)
  const loadUser = async (): Promise<boolean> => {
    if (!token.value) {
      console.log('No token available for loadUser')
      return false
    }
    
    try {
      console.log('Loading user from API...')
      const { data, error } = await useFetch<AuthResponse>('/api/auth/user')
      
      if (error.value) {
        throw error.value
      }

      if (data.value?.user) {
        user.value = data.value.user
        saveUserToStorage(user.value)
        console.log('User loaded from API successfully')
        return true
      }
      
      return false
    } catch (error: any) {
      console.error('Failed to load user from API:', error)
      return false
    }
  }

  // Login
  const login = async (credentials: { email: string; password: string }) => { 
    const { data, error } = await useFetch<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: credentials
    })

    if (error.value) throw error.value;

    user.value = data.value?.user as User || null;
    token.value = data.value?.token || null;
    saveUserToStorage(user.value);

    // SOLO log migration, no action
    const cartStore = useCartStore();
    console.log('🛒 Cart preserved during login:', cartStore.items.length, 'items');    
    
    return data.value
  }

  const loginWithGoogle = async () => {
    // Implement authentication with Google
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

    // Persist user in localStorage
    saveUserToStorage(user.value)
    
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
      clearAuthData()
      
      const cartStore = useCartStore()
      await cartStore.clearCart()
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

  // Initialize from storage
  if (import.meta.client) {
    //hydrateFromStorage() <--- This is not needed here anymore
    
    // Verify token on page load
    if (token.value && !user.value) {
      loadUser()
    }
  }

  return { 
    user,
    token, // EXPOSE token for the plugin
    isAuthenticated, 
    login,
    loginWithGoogle,
    logout, 
    loadUser,
    register,
    forgotPassword,
    resetPassword,
    hydrateFromStorage,
    clearAuthData
  }
});
