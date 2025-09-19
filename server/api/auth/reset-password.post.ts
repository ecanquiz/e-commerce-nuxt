import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const { token, newPassword } = await readBody(event)
    
    if (!token || !newPassword) {
      throw createError({
        statusCode: 400,
        message: 'Token y nueva contraseña son requeridos'
      })
    }

    if (newPassword.length < 6) {
      throw createError({
        statusCode: 400, 
        message: 'La contraseña debe tener al menos 6 caracteres'
      })
    }

    const result = await authService.resetPassword(token, newPassword)
    return result
    
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error reseteando contraseña'
    })
  }
})
