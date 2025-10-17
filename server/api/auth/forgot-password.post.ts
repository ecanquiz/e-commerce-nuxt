import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)    
    
    // Transparent proxy: passing everything directly
    await authService.forgotPassword(body);
    return { message: 'Si el email existe, se enviaron instrucciones' }    
  } catch (error: any) {
    // Resend the exact error from Nest to Nest
    console.error('🔐 [Nitro] Forgot password error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error requesting password reset',
      data: error.data || error
    });
  }
})
