import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    console.log('🔐 [Nitro] Reset password proxy - received body:', body)
    console.log('🔐 [Nitro] Body type:', typeof body)
    console.log('🔐 [Nitro] Body keys:', Object.keys(body))
    
    console.log('🔐 [Nitro] Passing through to Nest...')
    const result = await authService.resetPassword(body)
    
    console.log('✅ [Nitro] Reset password successful:', result)
    return result
    
  } catch (error: any) {
    console.error('🔐 [Nitro] Reset password error:', error)
    console.error('🔐 [Nitro] Error status:', error.statusCode)
    console.error('🔐 [Nitro] Error message:', error.message)
    console.error('🔐 [Nitro] Error data:', error.data)
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error reseteando contraseña',
      data: error.data || error
    })
  }
})
