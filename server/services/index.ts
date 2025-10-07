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

// Use mock by default until NestJS is ready  
export function createAuthService(): AuthService {
  return process.env.AUTH_MOCK_MODE === 'false'
    ? new NestAuthService()
    : new MockAuthService()
}

export function createUserService(): UserService {
  console.log('DEBUGGING FROM NITRO SERVER')
  console.log('[NITRO] USER_MOCK_MODE', process.env.USER_MOCK_MODE)
  console.log('[NITRO] process.env.USER_MOCK_MODE === false', process.env.USER_MOCK_MODE === 'false')
  console.log('Please: Delete these consolesLog after checking that it is working properly.')
  
  return process.env.USER_MOCK_MODE === 'false'
    ? new NestUserService()
    : new MockUserService()
}

export function createServiceService(): ServiceService {
  return process.env.SERVICE_MOCK_MODE === 'false'
    ? new NestServiceService()
    : new MockServiceService()
}

export function createProductService(): ProductService {

  console.log('config servicio de producto')

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
export const userService = createUserService() // Por ahora solo mock, no hay NestJS para usuarios
