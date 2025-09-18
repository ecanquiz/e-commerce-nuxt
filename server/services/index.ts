import { MockAuthService, NestAuthService, AuthService } from './auth.service'
import { MockServiceService, NestServiceService, ServiceService } from './service.service'
import { MockProductService, NestProductService, ProductService } from './product.service'
import { MockCartService, NestCartService, CartService } from './cart.service'

export function createAuthService(): AuthService {
  // Use mock by default until NestJS is ready  
  return process.env.AUTH_MOCK_MODE === 'false' 
    ? new NestAuthService() 
    : new MockAuthService()
}

export function createServiceService(): ServiceService {
  return process.env.SERVICE_MOCK_MODE === 'false' 
    ? new NestServiceService() 
    : new MockServiceService()
}

export function createProductService(): ProductService {
  return process.env.PRODUCT_MOCK_MODE === 'false' 
    ? new NestProductService() 
    : new MockProductService()
}

export function createCartService(): CartService {
  return process.env.CART_MOCK_MODE === 'false' 
    ? new NestCartService() 
    : new MockCartService()
}

// Export for easy use
export const authService = createAuthService()
export const serviceService = createServiceService()
export const productService = createProductService()
export const cartService = createCartService()
