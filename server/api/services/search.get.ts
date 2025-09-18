import { productService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const results = await productService.searchProducts(
      query.q as string,
      query.category as string | undefined
    )
    
    // Simular delay como en tu código actual
    if (import.meta.dev) {
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    
    return { 
      data: results.slice(0, 10), // Limitar resultados
      meta: { total: results.length }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en la búsqueda'
    })
  }
})
