import { MockAuthService, NestAuthService, AuthService } from './auth.service'
import { MockVineyardService, NestVineyardService, VineyardService } from './vineyard.service'
import { MockProductService, NestProductService, ProductService } from './product.service'
import { MockCartService, NestCartService, CartService } from './cart.service'

export function createAuthService(): AuthService {
  // Usar mock por defecto hasta que NestJS esté listo
  return process.env.MOCK_MODE === 'false' 
    ? new NestAuthService() 
    : new MockAuthService()
}

export function createVineyardService(): VineyardService {
  return process.env.MOCK_MODE === 'false' 
    ? new NestVineyardService() 
    : new MockVineyardService()
}

export function createProductService(): ProductService {
  return process.env.MOCK_MODE === 'false' 
    ? new NestProductService() 
    : new MockProductService()
}

export function createCartService(): CartService {
  return process.env.MOCK_MODE === 'false' 
    ? new NestCartService() 
    : new MockCartService()
}

// Export para uso fácil
export const authService = createAuthService()
export const vineyardService = createVineyardService()
export const productService = createProductService()
export const cartService = createCartService()
