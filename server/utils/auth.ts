import { mockUsers } from '~~/server/models/user.model'
import type { H3Event } from 'h3'

interface AuthResult {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export const requireAuth = (event: H3Event): AuthResult => {
  const token = getHeader(event, 'authorization')?.split(' ')[1]
  
  if (!token) {
    throw createError({ 
      statusCode: 401,
      message: 'Token de autorización requerido'
    })
  }

  // Simplified token verification
  const userId = token.split('.')[1] // En producción usa: `jwt.verify()`
  const user = mockUsers.find((u: { id: string }) => u.id === userId)

  if (!user) {
    throw createError({ 
      statusCode: 401,
      message: 'Usuario no autorizado'
    })
  }

  // Returns only the necessary data (without password)
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }
}