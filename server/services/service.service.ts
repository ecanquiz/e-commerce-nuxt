import generateId from '../utils/generateId';

export interface ServiceService {
  getAllServices(): Promise<any[]>
  getServiceById(id: string): Promise<any>
  searchServices(query: string, category?: string): Promise<any[]>
  createService(serviceData: any, userId: string): Promise<any>
  updateService(id: string, serviceData: any, userId: string): Promise<any>
  deleteService(id: string, userId: string): Promise<void>
}

// Mock implementation - BASADO EN TU CÓDIGO ACTUAL
export class MockServiceService implements ServiceService {
  async getAllServices() {
    const { mockServices } = await import('~~/server/models/service.model')
    
    return mockServices.map(service => {      
      return { ...service }
    })
  }

  async getServiceById(id: string) {
    const { getProductById } = await import('~~/server/models/service.model')
    
    const product = getProductById(id)
    if (!product) {
      throw createError({
        statusCode: 404,
        message: 'Producto no encontrado'
      })
    }
    
    return { ...product }
  }

  async searchServices(query: string, category?: string) {
    const { searchProducts } = await import('~~/server/models/service.model')
    
    const results = searchProducts(query, category)
    
    return results.map(product => {
      
      return { ...product, }
    })
  }

  async createService(productData: any, userId: string) {
    const { mockServices } = await import('~~/server/models/service.model')

    const newProduct = {
      id: `product_${generateId()}`,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockServices.push(newProduct)
    return newProduct
  }

  async updateService(id: string, productData: any, userId: string) {
    const { mockServices } = await import('~~/server/models/service.model')
    
    const index = mockServices.findIndex(p => p.id === id)
    if (index === -1) {
      throw createError({
        statusCode: 404,
        message: 'Producto no encontrado'
      })
    }

    mockServices[index] = {
      ...mockServices[index],
      ...productData,
      updatedAt: new Date().toISOString()
    }

    return mockServices[index]
  }

  async deleteService(id: string, userId: string) {
    const { mockServices } = await import('~~/server/models/service.model')
    
    const index = mockServices.findIndex(p => p.id === id)
    if (index === -1) {
      throw createError({
        statusCode: 404,
        message: 'Producto no encontrado'
      })
    }
    mockServices.splice(index, 1)
  }
}

// Nest implementation - PARA EL FUTURO
export class NestServiceService implements ServiceService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEST_API_URL || 'http://localhost:3001'
  }

  async getAllServices() {
    const response = await $fetch(`${this.baseUrl}/services`)
    return response as unknown as Promise<any[]>
  }

  async getServiceById(id: string) {
    const response = await $fetch(`${this.baseUrl}/services/${id}`)
    return response
  }

  async searchServices(query: string, category?: string) {
    const response = await $fetch(`${this.baseUrl}/services/search`, {
      query: { q: query, category }
    })
    return response as unknown as Promise<any[]>
  }

  async createService(serviceData: any, userId: string) {
    const response = await $fetch(`${this.baseUrl}/services`, {
      method: 'POST',
      body: serviceData,
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response
  }

  async updateService(id: string, serviceData: any, userId: string) {
    const response = await $fetch(`${this.baseUrl}/services/${id}`, {
      method: 'PUT',
      body: serviceData,
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response
  }

  async deleteService(id: string, userId: string) {
    await $fetch(`${this.baseUrl}/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userId}` }
    })
  }
}
