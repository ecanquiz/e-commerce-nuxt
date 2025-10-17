import { authService } from '~~/server/services'

export const requireAuth = async (event: any) => {
  try {
    const token = getHeader(event, 'authorization')?.split(' ')[1]
    
    if (!token) {
      throw createError({ 
        statusCode: 401,
        message: 'Token de autorización requerido'
      })
    }

    // @ts-ignore 
    const user = await authService.validateToken(token) // This method does not yet exist in the service.
    return { user }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 401,
      message: error.message || 'No autorizado'
    })
  }
}