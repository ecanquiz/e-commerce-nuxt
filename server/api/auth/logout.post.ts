import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: 'Token de autorización requerido'
      })
    }
    
    return await authService.logout(authHeader)
    
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en el logout'
    })
  }
})