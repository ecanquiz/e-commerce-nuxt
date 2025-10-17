import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    // const authHeader = getHeader(event, 'Authorization');
    const headers = getHeaders(event);
    // Get ALL headers when you want to debug
    // const method = event.method;
    // const url = getRequestURL(event);
    const body = await readBody(event);    
    const authHeader = headers.authorization || headers.Authorization

    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: 'Authorization token required'
      })
    }

    // Transparent proxy: passing everything directly to Nest
    return await authService.updateProfile(authHeader, body);    
  } catch (error: any) {
    // Resend the exact error from Nest
    console.error('🔐 [Nitro] Update profile error:', error);    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error updating profile',
      data: error.data || error
    });
  }
})

