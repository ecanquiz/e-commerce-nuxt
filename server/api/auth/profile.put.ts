import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    //const authHeader = getHeader(event, 'Authorization')


    // Obtener TODOS los headers para debug
    const headers = getHeaders(event)
    const method = event.method
    const url = getRequestURL(event)
    const body = await readBody(event)

    console.log('🔐 [Nitro] Method:', method)
    console.log('🔐 [Nitro] URL:', url.href)
    console.log('🔐 [Nitro] All headers:', headers)
    
    const authHeader = headers.authorization || headers.Authorization

    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: 'Authorization token required'
      })
    }

    console.log('🔐 [Nitro] Auth header raw:', authHeader)
    console.log('🔐 [Nitro] Auth header length:', authHeader?.length)
    console.log('🔐 [Nitro] Auth header starts with Bearer?:', authHeader?.startsWith('Bearer '))
    
    console.log('🔐 [Nitro] Request body type:', typeof body)
    console.log('🔐 [Nitro] Request body keys:', body ? Object.keys(body) : 'null')
    console.log('🔐 [Nitro] Request body encData exists?:', body?.encData ? 'YES' : 'NO')
    
    console.log('🔐 [Nitro] Calling authService.updateProfile...')
    const updatedUser = await authService.updateProfile(authHeader, body)
    
    console.log('✅ [Nitro] Update profile successful:', updatedUser)
    return updatedUser
    
  } catch (error: any) {
    console.error('🔐 [Nitro] Update profile error:', error)
    console.error('🔐 [Nitro] Error status:', error.statusCode)
    console.error('🔐 [Nitro] Error message:', error.message)
    console.error('🔐 [Nitro] Error data:', error.data)
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error updating profile',
      data: error.data || error
    })
  }
})

