import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'Authorization')
    
    console.log('🔐 [Nitro] Profile proxy - passing through to Nest')

    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: 'Authorization token required'
      });
    }
    
    // Transparent proxy: passing everything directly to Nest
    return await authService.getProfile(authHeader);
  } catch (error: any) {
    // Resend the exact error from Nest
    console.error('🔐 [Nitro] Profile error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting profile',
      data: error.data || error
    });
  }
})
