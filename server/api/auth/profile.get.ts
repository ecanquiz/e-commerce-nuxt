import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'Authorization')
    
    console.log('🔐 [Nitro] Profile proxy - passing through to Nest')
    
    // Proxy transparente
    const user = await authService.getProfile(authHeader)
    return user
    
  } catch (error: any) {
    console.error('🔐 [Nitro] Profile error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting profile',
      data: error.data || error
    })
  }
})
