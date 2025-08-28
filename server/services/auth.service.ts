import generateId from '../utils/generateId';

export interface AuthService {
  login(email: string, password: string): Promise<{ user: any; token: string }>
  register(userData: any): Promise<{ user: any; token: string }>
  getUser(userId: string): Promise<any>
  validateToken(token: string): Promise<any>
}

// Mock implementation - BASADO EN TU CÓDIGO ACTUAL
export class MockAuthService implements AuthService {
  async login(email: string, password: string) {
    // Import dinámico para evitar circular dependencies
    const { findUserByEmail, validatePassword } = await import('~~/server/models/user.model')
    
    const user = findUserByEmail(email)
    if (!user || !validatePassword(user, password)) {
      throw createError({
        statusCode: 401,
        message: 'Credenciales inválidas'
      })
    }

    // Simular JWT token (como en tu código actual)
    const token = `mock-jwt-token.${user.id}`

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  }

  async register(userData: any) {
    const { mockUsers } = await import('~~/server/models/user.model')
    
    // Check if user already exists
    if (mockUsers.find(u => u.email === userData.email)) {
      throw createError({
        statusCode: 400,
        message: 'User already exists'
      })
    }    

    // Create new user (sin hashear password por ahora, como en tu mock)
    const newUser = {
      id: `user_${generateId()}`,
      ...userData,
      createdAt: new Date().toISOString()
    }

    mockUsers.push(newUser)
    
    // Simular JWT token
    const token = `mock-jwt-token.${newUser.id}`

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token
    }
  }

  async getUser(userId: string) {
    const { findUserById } = await import('~~/server/models/user.model')
    const user = findUserById(userId)
    
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }

  async validateToken(token: string) {
    // Simular validación de token (como en tu código actual)
    const userId = token.split('.')[1]
    return this.getUser(userId)
  }
}

// Nest implementation - PARA EL FUTURO
export class NestAuthService implements AuthService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEST_API_URL || 'http://localhost:3001'
  }

  async login(email: string, password: string) {
    const response = await $fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      body: { email, password }
    })
    return response as unknown as Promise<{ user: any; token: string }>
  }

  async register(userData: any) {
    const response = await $fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      body: userData
    })
    return response as unknown as Promise<{ user: any; token: string }>
  }

  async getUser(userId: string) {
    const response = await $fetch(`${this.baseUrl}/auth/user/${userId}`)
    return response
  }

  async validateToken(token: string) {
    const response = await $fetch(`${this.baseUrl}/auth/validate`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response
  }
}