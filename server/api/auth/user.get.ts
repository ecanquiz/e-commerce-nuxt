import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader) {
      throw createError({ 
        statusCode: 401,
        message: 'Token required'
      })
    }

    return await authService.getProfile(authHeader)
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting user'
    })
  }
})