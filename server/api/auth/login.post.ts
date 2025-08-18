import { findUserByEmail, validatePassword } from '~~/server/models/user.model'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // Basic validation
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email y contraseña son requeridos'
    })
  }

  const user = findUserByEmail(email)
  
  if (!user || !validatePassword(user, password)) {
    throw createError({
      statusCode: 401,
      message: 'Credenciales inválidas'
    })
  }

  // We simulate JWT token (actually we would use `jsonwebtoken`)
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
})