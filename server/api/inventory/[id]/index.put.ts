import { inventoryService } from '~~/server/services'
import type { StockUpdate } from '~~/shared/types/inventory'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Required product ID is missing'
      })
    }

    const body = await readBody(event)
    
    const stockUpdate: StockUpdate = {
      current_stock: body.current_stock,
      minimum_stock: body.minimum_stock,
      maximum_stock: body.maximum_stock,
      updated_by: body.updated_by || 'user'
    }

    const updatedInventory = await inventoryService.updateInventory(id, stockUpdate)
    return updatedInventory
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error updating inventory'
    })
  }
})
