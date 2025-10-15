//import { defineStore } from 'pinia'
import { useCartStore } from '~/store/cart';
import type { User } from '~~/shared/types'

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'merchant';
  phone?: string;
  birthDate?: string;
  businessName?: string;
  businessDescription?: string;
  preferences?: {
    wineTypes: string[]
    notifications: boolean
    newsletter: boolean
  };
  location?: {
    lat: number;
    lng: number;
  };
}

export interface AuthResponse {
  user: User
  token: string
  message?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Omit<User, 'password' | 'createdAt'> | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const _isHydrated = ref(false)

  const setToken = (newToken: string | null) => {
    token.value = newToken
    
    if (import.meta.client) {
      if (newToken) {
        // Use document.cookie directly for better control
        document.cookie = `auth_token=${newToken}; path=/; max-age=86400; SameSite=Lax` // 24 hours
        localStorage.setItem('auth_token', newToken) // Backup en localStorage
      } else {
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        localStorage.removeItem('auth_token')
      }
    }
  }

  // Hydrate from storage
  const hydrateFromStorage = () => {
    if (import.meta.client && !_isHydrated.value) {

      // 1. Try from cookie first
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth_token='))
        ?.split('=')[1]
      
      // 2. Search for token in localStorage
      const localStorageToken = localStorage.getItem('auth_token');

      // 2. If there is no cookie, try localStorage
      const storedToken = cookieToken || localStorageToken;

      if (storedToken) {
        token.value = storedToken // console.log('✅ Token hydrated from storage')
      } // else { console.log('❌ No token found in storage'); }

      // 4. Load user from localStorage
      const savedUser = localStorage.getItem('auth_user')
      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser);
          _isHydrated.value = true; // console.log('✅ User hydrated from localStorage:', user.value?.email);
        } catch (error) {
          console.error('❌ Error parsing saved user:', error);
          localStorage.removeItem('auth_user')
        }
      } // else { console.log('❌ No user found in localStorage'); }
      // console.log('💧 Hydration complete');
    }
  }

  const saveUserToStorage = (userData: Omit<User, 'password' | 'createdAt'> | null) => {
    if (import.meta.client) {
      if (userData) {
        localStorage.setItem('auth_user', JSON.stringify(userData))
        // console.log('User saved to localStorage')
      } else {
        localStorage.removeItem('auth_user')
        // console.log('User removed from localStorage')
      }
    }
  }

  const clearAuthData = () => {
    if (import.meta.client) {
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
    token.value = null
    user.value = null
    _isHydrated.value = false
    // console.log('Auth data cleared')
  }

  // Load user from API (to verify valid token)
  const loadUser = async (): Promise<boolean> => {
    if (!token.value) {
      // console.log('No token available for loadUser')
      return false
    }
    
    try {
      // console.log('Loading user from API...')
      const { data, error } = await useFetch<AuthResponse>('/api/auth/user',  {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      
      if (error.value) throw error.value;

      if (data.value?.user) {
        user.value = data.value.user
        saveUserToStorage(user.value)
        // console.log('User loaded from API successfully')
        return true
      }
      
      return false
    } catch (error: any) {
      console.error('Failed to load user from API:', error)
      clearAuthData() // Clear if the token is invalid
      return false
    }
  }

  // Login
  const login = async (credentials: { email: string; password: string }) => { 
    const { data, error, execute, status } = useEncryptedFetch<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: credentials,
      key: `auth-login-${credentials.email}`,
      immediate: false,
      //onRequest: () => console.log('🔐 Starting encrypted login...'),
      //onResponse: () => console.log('✅ Login response received'),
      onResponseError: ({ error }) => console.error('🔐 Login failed:', error)
    })
    
    await execute() // Run manually

    if (error.value) throw error.value
    if (!data.value) throw new Error('No data received')

    user.value = data.value.user as User || null
    // token.value = data.value.token || null
    setToken(data.value?.token || null)
    saveUserToStorage(user.value)

    // Only log migration, no action
    const cartStore = useCartStore();
    // console.log('🛒 Cart preserved during login:', cartStore.items.length, 'items');    
    
    return data.value
  }

  const loginWithGoogle = async () => {
    // Implement authentication with Google
  };

  // Register
  const register = async (userData: RegisterData) => {
    const { data, error, execute } = useEncryptedPost<AuthResponse>(`/api/auth/register-${userData.role}`, {
        body: userData,
        key: `auth-register-${userData.email}`,
        immediate: false,
        // onRequest: () => console.log('🔐 Starting encrypted registration...'),
        // onResponse: () => console.log('✅ Registration response received')
    })

    await execute()

    if (error.value) {
      throw new Error(error.value.message || 'Registration failed')
    }

    if (!data.value) throw new Error('No data received')

    user.value = data.value.user
    // token.value = data.value.token
    setToken(data.value?.token || null);
    saveUserToStorage(user.value)  

    const cartStore = useCartStore()
    // console.log('🛒 Cart preserved during register:', cartStore.items.length, 'items')

    return data.value
  }

  // Logout
  const logout = async () => {
    try {
      if (token.value) {
        const { execute } = useEncryptedFetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          key: `auth-logout-${Date.now()}`,
          immediate: false,
          // onRequest: () => console.log('🔐 Starting encrypted logout...'),
          // onResponse: () => console.log('✅ Logout completed on server')
        })
        
        await execute()
      }
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

  // Verify email
  const verifyEmail = async (token: string): Promise<{ message: string }> => {
    try {
      const { data, error, execute } = useEncryptedGet<{ message: string }>(
        `/api/auth/verify-email?token=${encodeURIComponent(token)}`,
        {
          key: `auth-verify-email-${token}`,
          immediate: false,
          // onRequest: () => console.log('🔐 Verifying email...'),
          // onResponse: () => console.log('✅ Email verification completed'),
          onResponseError: ({ error }) => console.error('🔐 Email verification failed:', error)
        }
      )

    await execute()

    if (error.value) {
      throw new Error(error.value.message || 'Error verifying email')
    }

    if (!data.value) {
      throw new Error('No response received from server')
    }

    return data.value

    }
    catch (error){
      console.error('Verify email error:', error);
      throw error;
    }
  }

  const forgotPassword = async (email: string): Promise<{ message: string }> => {
    try {
      const { data, error, execute } = useEncryptedPost<{ message: string }>('/api/auth/forgot-password', {
        body: { email },
        key: `auth-forgot-password-${email}`,
        immediate: false,
        // onRequest: () => console.log('🔐 Requesting password reset...'),
        // onResponse: () => console.log('✅ Password reset request sent'),
        onResponseError: ({ error }) => console.error('🔐 Password reset request failed:', error)
      })

      await execute()

      if (error.value) {
        throw new Error(error.value.message || 'Error requesting password reset')
      }

      if (!data.value) throw new Error('No data received')

      return data.value as { message: string };
    } catch (error) {
      console.error('Password recovery error:', error);
      throw error;
    }
  }

  const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const { data, error, execute } = useEncryptedPost<{ message: string }>('/api/auth/reset-password', {
        body: { token, newPassword },
        key: `auth-reset-password-${token}`,
        immediate: false,
        // onRequest: () => console.log('🔐 Resetting password...'),
        // onResponse: () => console.log('✅ Password reset completed'),
        onResponseError: ({ error }) => console.error('🔐 Password reset failed:', error)
      })

      await execute()

      if (error.value) {
        throw new Error(error.value.message || 'Error resetting password')
      }

      if (!data.value) throw new Error('No data received')

      return data.value as { message: string }
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  const fetchProfile = async ()=> {
    try {
      if (!token.value) throw new Error('No token available');
  
        const { data, error, execute } = useEncryptedFetch<any>('/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          key: `auth-profile-${Date.now()}`,
          immediate: false,
          // onRequest: () => console.log('🔐 Fetching profile...'),
          // onResponse: () => console.log('✅ Profile fetched successfully')
        })

        await execute()

        if (error.value) {
          throw new Error(error.value.message || 'Error fetching profile')
        }

        if (!data.value) throw new Error('No data received')

        user.value = data.value
        return data.value
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  const updateProfile = async(profileData: { name: string }) => {
    try {
      if (!token.value){
        console.error('🔐 [Store] Token not available:', token.value)
        console.error('🔐 [Store] User state:', user.value)
        console.error('🔐 [Store] Is authenticated:', isAuthenticated.value)
        throw new Error('No token available')
      }

      // Verify the JWT token
      const tokenParts = token.value.split('.')
      if (tokenParts.length === 3) {
        try {
          const payload = JSON.parse(atob(tokenParts[1] as any))
          // console.log('🔐 [Store] JWT payload:', payload)
          // console.log('🔐 [Store] JWT expires:', new Date(payload.exp * 1000))
          // console.log('🔐 [Store] JWT is expired?', new Date() > new Date(payload.exp * 1000))
        } catch (e) {
          console.error('🔐 [Store] JWT parsing error:', e)
        }
      }

      // console.log('🔐 [Store] Token available, updating profile...')
      // console.log('🔐 [Store] Token length:', token.value.length)
      // console.log('🔐 [Store] Authorization header:', `Bearer ${token.value}`)

      const { data, error, execute } = useEncryptedFetch<any>('/api/auth/profile', {
        method: 'PUT',
        body: profileData,
        headers: {
          Authorization: token.value // Already includes "Bearer" if necessary
        },
        key: `auth-update-profile-${Date.now()}`,
        immediate: false,
        // onRequest: () => console.log('🔐 Updating profile...'),
        // onResponse: () => console.log('✅ Profile updated successfully')
      })

      await execute()

      if (error.value) {
        throw new Error(error.value.message || 'Error updating profile')
      }

      if (!data.value) throw new Error('No data received')

      user.value = { ...user.value, ...data.value }
      saveUserToStorage(user.value)

      return data.value
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  const changePassword = async (passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<{ message: string }> => {
    try {
      if (!token.value) throw new Error('No hay token disponible')

      const { data, error, execute } = useEncryptedFetch<{ message: string }>('/api/auth/profile-password', {
        method: 'PUT',
        body: passwordData,
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        key: `auth-change-password-${Date.now()}`,
        immediate: false,
        // onRequest: () => console.log('🔐 Changing password...'),
        // onResponse: () => console.log('✅ Password changed successfully')
      })

      await execute()

      if (error.value) {
        throw new Error(error.value.message || 'Error changing password')
      }

      if (!data.value) throw new Error('No data received')

      return data.value
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  return { 
    user,
    token, // EXPOSE token for the plugin
    isAuthenticated,
    _isHydrated,
    login,
    loginWithGoogle,
    logout, 
    loadUser,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
    hydrateFromStorage,
    clearAuthData,
    fetchProfile,
    updateProfile,
    changePassword
  }
});
