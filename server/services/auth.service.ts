import generateId from '../utils/generateId';

export interface AuthService {  
  login(payload: any): Promise<{ user: any; token: string }>;
  register(userData: any): Promise<{ user: any; token: string }>;
  //getUser(userId: string): Promise<any>;
  logout(token: string): Promise<{ success: boolean; message: string }>;
  verifyEmail(token: string): Promise<{ message: string }>;
  forgotPassword(payload: any): Promise<void>;
  resetPassword(payload: any): Promise<{ message: string }>;
  getProfile(authHeader: string): Promise<any>;
  updateProfile(authHeader: string, profileData: any): Promise<any>;
  changePassword(authHeader: string, passwordData: any): Promise<{ message: string }>;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Mock implementation - BASED ON YOUR CURRENT CODE
export class MockAuthService implements AuthService {
  async login(payload: any) {
    let email: string
    let password: string
    
    if (payload.encData) {
      email = 'test@example.com'
      password = 'password'
    } else {
      email = payload.email
      password = payload.password
    }
    
    const { findUserByEmail, validatePassword } = await import('~~/server/models/user.model')
    
    const user = findUserByEmail(email)
    if (!user || !validatePassword(user, password)) {
      throw createError({
        statusCode: 401,
        message: 'Credenciales inválidas'
      })
    }

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

  /*async getUser(userId: string) {
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
  }*/

  async logout(token: string): Promise<{ success: boolean; message: string }> {
    return { 
      success: true, 
      message: 'Logout successful (mock)' 
    }
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
      return { message: 'Email verified successfully (mock)' }
  }

  async forgotPassword(payload: any): Promise<void> {
    console.log('Mock: Password reset email sent to', payload);
  }

  async resetPassword(payload: any): Promise<{ message: string }> {
    return { message: 'Password reset successful (mock)' };
  }

  async getProfile(authHeader: string): Promise<any> {
    const userId = authHeader.split('.')[1];

    if (!userId) {
      throw createError({
        statusCode: 401,
        message: 'Must provide credentials'
      });
    }

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
  
  async updateProfile(authHeader: string, profileData: any): Promise<any> {
    const userId = authHeader.split('.')[1]; // Asumiendo formato mock
    const { mockUsers } = await import('~~/server/models/user.model');
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      });
    }

    // Update only the name (as you want)
    mockUsers[userIndex]!.name = profileData.name;
    
    return {
      id: mockUsers[userIndex]!.id,
      name: mockUsers[userIndex]!.name,
      email: mockUsers[userIndex]!.email,
      role: mockUsers[userIndex]!.role
    };
  }

  async changePassword(authHeader: string, passwordData: any): Promise<{ message: string }> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validaciones básicas en el mock
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      throw createError({
        statusCode: 400,
        message: 'Las nuevas contraseñas no coinciden'
      });
    }

    if (passwordData.newPassword.length < 8) {
      throw createError({
        statusCode: 400,
        message: 'La nueva contraseña debe tener al menos 8 caracteres'
      });
    }

    return { message: 'Contraseña actualizada correctamente (mock)' };
  }
}

// Nest implementation - PARA EL FUTURO
export class NestAuthService implements AuthService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEST_API_URL || 'http://localhost:3001'
  }

  async login(payload: any) {
    console.log('🔐 [NestAuthService] Making request to Nest...')
    console.log('🔐 [NestAuthService] URL:', `${this.baseUrl}/auth/login`)
    console.log('🔐 [NestAuthService] Payload type:', typeof payload)
    console.log('🔐 [NestAuthService] Payload keys:', Object.keys(payload))
    
    try {
      const response = await $fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('✅ [NestAuthService] Nest response received')
      return response as unknown as Promise<{ user: any; token: string }>
    } catch (error: any) {
      console.error('❌ [NestAuthService] Error calling Nest:', error)
      console.error('❌ [NestAuthService] Error status:', error.statusCode)
      console.error('❌ [NestAuthService] Error message:', error.message)
      throw error
    }
  }

  async register(payload: any) {
    console.log('🔐 [Nitro→Nest] Passing through register request');
    console.log('🔐 [Nitro→Nest] Payload type:', typeof payload);
    console.log('🔐 [Nitro→Nest] Payload keys:', payload ? Object.keys(payload) : 'null');
    console.log('🔐 [Nitro→Nest] Payload path:',`${this.baseUrl}/auth/register-customer`);
    
    const response = await $fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('✅ [Nitro→Nest] Register response received from Nest')
    
    // Return the exact response from Nest (encrypted or not)
    return response as unknown as Promise<{ user: any; token: string }>
  }

  /*async getUser(userId: string) {
    const response = await $fetch(`${this.baseUrl}/auth/user/${userId}`)
    return response
  }*/

  async logout(token: string): Promise<{ success: boolean; message: string }> {
    console.log('🔐 [Nitro→Nest] Passing through logout request')
    
    try {
      const response = await $fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: { 
          Authorization: token //Already includes "Bearer "
        }
      })
      
      console.log('✅ [Nitro→Nest] Logout successful')
      return { 
        success: true, 
        message: (response as any).message || 'Logout successful' 
      }
    } catch (error: any) {
      console.error('❌ [Nitro→Nest] Logout error:', error)
      throw createError({
        statusCode: error.statusCode || 500,
        message: error.data?.message || error.message || 'Error during logout'
      })
    }
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    try {      
      const response = await $fetch(`${this.baseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      return response as { message: string };
      
    } catch (error: any) {
      console.error('[NestAuthService] Error calling NestJS:', error); // statusCode, message, data
      throw error;
    }
  }

  async forgotPassword(payload: any): Promise<void> {
    console.log('🔐 [Nitro→Nest] Passing through forgot password request')
    
    // Pasar el payload completo (puede estar encriptado)
    await $fetch(`${this.baseUrl}/auth/forgot-password`, {
      method: 'POST',
      body: payload,
      headers: { 'Content-Type': 'application/json' }
    })
    
    console.log('✅ [Nitro→Nest] Forgot password request completed')
  }

  async resetPassword(payload: any): Promise<{ message: string }> {
    console.log('🔐 [Nitro→Nest] Reset password payload:', payload)
    console.log('🔐 [Nitro→Nest] Payload type:', typeof payload)
    console.log('🔐 [Nitro→Nest] Payload keys:', Object.keys(payload))
    
    try {
      const response = await $fetch(`${this.baseUrl}/auth/reset-password`, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' }
      })
      
      console.log('✅ [Nitro→Nest] Reset password successful:', response)
      return response as { message: string }
      
    } catch (error: any) {
      console.error('❌ [Nitro→Nest] Reset password error details:')
      console.error('❌ Status:', error.statusCode)
      console.error('❌ Message:', error.message)
      console.error('❌ Data:', error.data)
      throw error
    }
  }

  async getProfile(authHeader: string): Promise<any> {
    console.log('🔐 [Nitro→Nest] Get profile - Auth header:', authHeader)

    let finalAuthHeader = authHeader
    if (authHeader && !authHeader.startsWith('Bearer ')) {
      finalAuthHeader = `Bearer ${authHeader}`
    }
    
    const response = await $fetch(`${this.baseUrl}/auth/profile`, {
      headers: { 
        Authorization: finalAuthHeader
      }
    })
    return response
  }

  async updateProfile(authHeader: string, body: any): Promise<any> {
    console.log('🔐 [Nitro→Nest] === UPDATE PROFILE SERVICE CALL ===')
    console.log('🔐 [Nitro→Nest] Auth header received:', authHeader)
    console.log('🔐 [Nitro→Nest] Auth header type:', typeof authHeader)
    console.log('🔐 [Nitro→Nest] Auth header first 50 chars:', authHeader?.substring(0, 50))
    
    console.log('🔐 [Nitro→Nest] Body received:', body)
    console.log('🔐 [Nitro→Nest] Body type:', typeof body)
    console.log('🔐 [Nitro→Nest] Body keys:', body ? Object.keys(body) : 'null')

    // Determinar qué enviar a Nest
    let requestBody = body
      // 🔥 AGREGAR "Bearer" SI NO LO TIENE
    let finalAuthHeader = authHeader
    if (authHeader && !authHeader.startsWith('Bearer ')) {
      console.log('🔐 [Nitro→Nest] Adding Bearer prefix to auth header')
      finalAuthHeader = `Bearer ${authHeader}`
    }
    
    console.log('🔐 [Nitro→Nest] Final auth header:', finalAuthHeader)
    

    
    // Si los datos están encriptados, necesitamos manejarlo diferente
    if (body?.encData) {
      console.log('🔐 [Nitro→Nest] Data is encrypted, passing as-is to Nest')
      // Nest debería desencriptar automáticamente si el middleware funciona
    } else {
      console.log('🔐 [Nitro→Nest] Data is not encrypted')
    }
    
    try {
      console.log('🔐 [Nitro→Nest] Making request to Nest...')
      console.log('🔐 [Nitro→Nest] URL:', `${this.baseUrl}/auth/profile`)
      
      const response = await $fetch(`${this.baseUrl}/auth/profile`, {
        method: 'PUT',
        body: requestBody,
        headers: { 
          Authorization: finalAuthHeader,
          'Content-Type': 'application/json'
        }
      })
      
      console.log('✅ [Nitro→Nest] Nest response:', response)
      return response
      
    } catch (error: any) {
      console.error('❌ [Nitro→Nest] Nest request failed:')
      console.error('❌ Status:', error.statusCode)
      console.error('❌ Message:', error.message)
      console.error('❌ Data:', error.data)
      console.error('❌ Full error:', error)
      
      throw error
    }
  }

  async changePassword(authHeader: string, passwordData: any): Promise<{ message: string }> {

    let finalAuthHeader = authHeader
    if (authHeader && !authHeader.startsWith('Bearer ')) {
      finalAuthHeader = `Bearer ${authHeader}`
    }

    console.log('🔐 [Nitro→Nest] Change password - Auth header:', finalAuthHeader)
    console.log('🔐 [Nitro→Nest] Change password - Body:', passwordData)
    
    const response = await $fetch(`${this.baseUrl}/auth/profile/password`, {
      method: 'PUT',
      body: passwordData,
      headers: { 
        Authorization: finalAuthHeader,
        'Content-Type': 'application/json'
      }
    })
    return response as { message: string }
  }

  // Helper to extract auth header and body from the payload
  private extractAuthAndBody(payload: any): { authHeader: string; body: any } {
    // If the payload is only the auth header (GET case)
    if (typeof payload === 'string') {
      return { authHeader: payload, body: undefined }
    }
    
    // If the payload comes with structure { authHeader, body }
    // (It can pass with encrypted data)
    if (payload.authHeader && payload.body) {
      return { authHeader: payload.authHeader, body: payload.body }
    }
    
    // By default, we assume the payload is the body and the auth header is separate.
    return { authHeader: payload, body: payload }
  }
}