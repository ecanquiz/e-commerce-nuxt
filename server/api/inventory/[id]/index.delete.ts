import { inventoryService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Required product ID is missing'
      })
    }

    await inventoryService.deleteProduct(id)
    return { success: true, message: 'Producto eliminado exitosamente' }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error deleting product'
    })
  }
})
