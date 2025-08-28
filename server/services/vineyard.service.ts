import generateId from '../utils/generateId';

export interface VineyardService {
  getAllVineyards(): Promise<any[]>
  getVineyardById(id: string): Promise<any>
  searchVineyards(query: string, category?: string): Promise<any[]>
  createVineyard(vineyardData: any, userId: string): Promise<any>
  updateVineyard(id: string, vineyardData: any, userId: string): Promise<any>
  deleteVineyard(id: string, userId: string): Promise<void>
}

// Mock implementation - BASADO EN TU CÓDIGO ACTUAL
export class MockVineyardService implements VineyardService {
  async getAllVineyards() {
    const { mockVineyards } = await import('~~/server/models/vineyard.model')
    
    // Simular delay como en tu código actual
    if (import.meta.dev) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    return mockVineyards.map(vineyard => ({
      ...vineyard,
      products: vineyard.products.map(product => ({
        ...product,
        vineyard: {
          id: vineyard.id,
          name: vineyard.name,
          location: vineyard.location
        }
      }))
    }))
  }

  async getVineyardById(id: string) {
    const { getVineyardById } = await import('~~/server/models/vineyard.model')
    const vineyard = getVineyardById(id)
    
    if (!vineyard) {
      throw createError({
        statusCode: 404,
        message: 'Vineyard not found'
      })
    }
    
    return vineyard
  }

  async searchVineyards(query: string, category?: string) {
    const { mockVineyards } = await import('~~/server/models/vineyard.model')
    
    // Búsqueda simple por nombre o descripción
    return mockVineyards.filter(vineyard => {
      const matchesQuery = vineyard.name.toLowerCase().includes(query.toLowerCase()) ||
                          vineyard.description.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = !category || category === 'all'
      return matchesQuery && matchesCategory
    })
  }

  async createVineyard(vineyardData: any, userId: string) {
    const { mockVineyards } = await import('~~/server/models/vineyard.model')

    const newVineyard = {
      id: `vineyard_${generateId()}`,
      ...vineyardData,
      owner: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockVineyards.push(newVineyard)
    return newVineyard
  }

  async updateVineyard(id: string, vineyardData: any, userId: string) {
    const { mockVineyards } = await import('~~/server/models/vineyard.model')
    
    const index = mockVineyards.findIndex(v => v.id === id)
    if (index === -1) {
      throw createError({
        statusCode: 404,
        message: 'Vineyard not found'
      })
    }

    // Verificar ownership (solo admin o el dueño puede editar)
    if (mockVineyards[index].owner !== userId) {
      throw createError({
        statusCode: 403,
        message: 'Access denied'
      })
    }

    mockVineyards[index] = {
      ...mockVineyards[index],
      ...vineyardData,
      updatedAt: new Date().toISOString()
    }

    return mockVineyards[index]
  }

  async deleteVineyard(id: string, userId: string) {
    const { mockVineyards } = await import('~~/server/models/vineyard.model')
    
    const index = mockVineyards.findIndex(v => v.id === id)
    if (index === -1) {
      throw createError({
        statusCode: 404,
        message: 'Vineyard not found'
      })
    }

    // Verificar ownership
    if (mockVineyards[index].owner !== userId) {
      throw createError({
        statusCode: 403,
        message: 'Access denied'
      })
    }

    mockVineyards.splice(index, 1)
  }
}

// Nest implementation - PARA EL FUTURO
export class NestVineyardService implements VineyardService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEST_API_URL || 'http://localhost:3001'
  }

  async getAllVineyards() {
    const response = await $fetch(`${this.baseUrl}/vineyards`)
    return response as unknown as Promise<any[]>
  }

  async getVineyardById(id: string) {
    const response = await $fetch(`${this.baseUrl}/vineyards/${id}`)
    return response
  }

  async searchVineyards(query: string, category?: string) {
    const response = await $fetch(`${this.baseUrl}/vineyards/search`, {
      query: { q: query, category }
    })
    return response as unknown as Promise<any[]>
  }

  async createVineyard(vineyardData: any, userId: string) {
    const response = await $fetch(`${this.baseUrl}/vineyards`, {
      method: 'POST',
      body: { ...vineyardData, owner: userId },
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response
  }

  async updateVineyard(id: string, vineyardData: any, userId: string) {
    const response = await $fetch(`${this.baseUrl}/vineyards/${id}`, {
      method: 'PUT',
      body: vineyardData,
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response
  }

  async deleteVineyard(id: string, userId: string) {
    await $fetch(`${this.baseUrl}/vineyards/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userId}` }
    })
  }
}