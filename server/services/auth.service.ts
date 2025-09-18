import generateId from '../utils/generateId';

export interface AuthService {
  login(email: string, password: string): Promise<{ user: any; token: string }>
  register(userData: any): Promise<{ user: any; token: string }>
  getUser(userId: string): Promise<any>
  validateToken(token: string): Promise<any>
  logout(token: string): Promise<{ success: boolean; message: string }>
  verifyEmail(token: string): Promise<{ message: string }>
}

// Mock implementation - BASED ON YOUR CURRENT CODE
export class MockAuthService implements AuthService {
  async login(email: string, password: string) {
    // Dynamic import to avoid circular dependencies
    const { findUserByEmail, validatePassword } = await import('~~/server/models/user.model')
    
    const user = findUserByEmail(email)
    if (!user || !validatePassword(user, password)) {
      throw createError({
        statusCode: 401,
        message: 'Credenciales inválidas'
      })
    }

    // Simulate JWT token (as in your current code)
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

    // Create a new user (no password hashing for now, like in your mock)
    const newUser = {
      id: `user_${generateId()}`,
      ...userData,
      createdAt: new Date().toISOString()
    }

    mockUsers.push(newUser)
    
    // Simulate JWT token
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
    console.log('Mock of validateToken')
    const userId = token.split('.')[1]
    return this.getUser(userId)
  }

  async logout(token: string): Promise<{ success: boolean; message: string }> {
    return { 
      success: true, 
      message: 'Logout successful (mock)' 
    }
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    return { message: 'Email verified successfully (mock)' }
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

  async logout(token: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await $fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: { 
          Authorization: token //Already includes "Bearer "
        }
      })
      
      return { 
        success: true, 
        message: (response as any).message || 'Logout successful' 
      }
    } catch (error: any) {
      console.error('Logout error:', error)
      throw createError({
        statusCode: error.statusCode || 500,
        message: error.data?.message || error.message || 'Error durante el logout'
      })
    }
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      console.log('🌐 [NestAuthService] Calling NestJS verify-email endpoint');
      console.log('🌐 [NestAuthService] URL:', `${this.baseUrl}/auth/verify-email`);
      console.log('🌐 [NestAuthService] Token:', token);
      
      const response = await $fetch(`${this.baseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      console.log('✅ [NestAuthService] Response from NestJS:', response);
      return response as { message: string };
      
    } catch (error: any) {
      console.error('❌ [NestAuthService] Error calling NestJS:', error);
      console.error('❌ [NestAuthService] Error status:', error.statusCode);
      console.error('❌ [NestAuthService] Error message:', error.message);
      console.error('❌ [NestAuthService] Error data:', error.data);
      throw error;
    }
  }
}