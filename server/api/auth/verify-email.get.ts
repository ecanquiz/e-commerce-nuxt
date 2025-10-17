import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)
    
  if (!token || typeof token !== 'string') {
    console.error('[Nuxt] Token missing or invalid');
    throw createError({
      statusCode: 400,
      message: 'Verification token required'
    });
  }

  try {
    // Transparent proxy: passing everything directly to Nest
    return await authService.verifyEmail(token);
  } catch (error: any) {
    // Resend the exact error from Nest
    console.error('[Nuxt] Verification error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error verifying email',
      data: error.data || error
    });
  }
})
