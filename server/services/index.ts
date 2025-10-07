import type { AuthService } from './auth.service';
import { MockAuthService, NestAuthService } from './auth.service'
import type { ServiceService } from './service.service';
import { MockServiceService, NestServiceService } from './service.service'
import type { ProductService } from './product.service';
import { MockProductService, NestProductService } from './product.service'
import type { CartService } from './cart.service';
import { MockCartService, NestCartService } from './cart.service'
import type { UserService } from './users.service';
import { MockUserService, NestUserService } from './users.service';

export function createAuthService(): AuthService {
  // Use mock by default until NestJS is ready  
  return import.meta.env.AUTH_MOCK_MODE === 'false'
    ? new NestAuthService()
    : new MockAuthService()
}
export function createUserService(): UserService {
  return import.meta.env.PRODUCT_MOCK_MODE === 'false'
    ? new NestUserService()
    : new MockUserService()
}

export function createServiceService(): ServiceService {
  return import.meta.env.SERVICE_MOCK_MODE === 'false'
    ? new NestServiceService()
    : new MockServiceService()
}

export function createProductService(): ProductService {

  console.log('config servicio de producto')

  return import.meta.env.PRODUCT_MOCK_MODE === 'false'
    ? new NestProductService()
    : new MockProductService()
}

export function createCartService(): CartService {
  return import.meta.env.CART_MOCK_MODE === 'false'
    ? new NestCartService()
    : new MockCartService()
}

// Export for easy use
export const authService = createAuthService()
export const serviceService = createServiceService()
export const productService = createProductService()
export const cartService = createCartService()
export const userService = createUserService() // Por ahora solo mock, no hay NestJS para usuarios
