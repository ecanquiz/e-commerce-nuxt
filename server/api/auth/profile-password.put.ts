import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'Authorization')
    const body = await readBody(event)
    
    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: 'Authorization token required'
      });
    }

    // Transparent proxy: passing everything directly to Nest
    return await authService.changePassword(authHeader, body);    
  } catch (error: any) {
    // Resend the exact error from Nest
    console.error('🔐 [Nitro] Change password error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al cambiar la contraseña',
      data: error.data || error
    });
  }
})