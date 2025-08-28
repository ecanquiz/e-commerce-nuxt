import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.split(' ')[1]
    
    if (!token) {
      throw createError({ 
        statusCode: 401,
        message: 'Token requerido'
      })
    }

    const userData = await authService.validateToken(token)
    return { user: userData }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al obtener usuario'
    })
  }
})