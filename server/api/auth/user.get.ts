import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization');
    
    if (!authHeader) {
      throw createError({ 
        statusCode: 401,
        message: 'Token required'
      });
    }

    // Transparent proxy: passing everything directly to Nest
    return await authService.getProfile(authHeader);
  } catch (error: any) {
    // Resend the exact error from Nest
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting user'
    });
  }
})