import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    console.log('🔐 [Nitro] Forgot password proxy - passing through to Nest')
    
    // Proxy transparente - pasar todo directamente
    await authService.forgotPassword(body)
    return { message: 'Si el email existe, se enviaron instrucciones' }
    
  } catch (error: any) {
    console.error('🔐 [Nitro] Forgot password error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error requesting password reset',
      data: error.data || error
    })
  }
})
