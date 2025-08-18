// import { defineStore } from 'pinia'
import type { User } from '~/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = useCookie('auth_token')
  const isAuthenticated = computed(() => !!user.value)

  // Login
  const login = async (credentials: { email: string; password: string }) => {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })

    if (error.value) throw error.value

    user.value = data.value?.user as User || null
    token.value = data.value?.token || null
  }

  // Logout
  const logout = async () => {
    await useFetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    token.value = null
  }

  // Load user on startup
  const loadUser = async () => {
    if (token.value) {
      const { data } = await useFetch('/api/auth/user')
      user.value = data.value?.user as User || null
    }
  }

  return { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    loadUser 
  }
})