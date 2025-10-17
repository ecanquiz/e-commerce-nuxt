import { MockAuthService, NestAuthService, type AuthService } from './auth.service'
import { MockServiceService, NestServiceService, type ServiceService } from './service.service'
import { MockProductService, NestProductService, type ProductService } from './product.service'
import { MockCartService, NestCartService, type CartService } from './cart.service'
import { MockUserService, NestUserService, type UserService } from './users.service';
import { MockInventoryService, NestInventoryService, type InventoryService } from './inventory.service'

// Use mock by default until NestJS is ready  
export function createAuthService(): AuthService {
  return process.env.AUTH_MOCK_MODE === 'false'
    ? new NestAuthService()
    : new MockAuthService()
}

export function createUserService(): UserService {  
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
  return process.env.PRODUCT_MOCK_MODE === 'false'
    ? new NestProductService()
    : new MockProductService()
}

export function createCartService(): CartService {
  return process.env.CART_MOCK_MODE === 'false'
    ? new NestCartService()
    : new MockCartService()
}

export function createInventoryService(): InventoryService {
  return process.env.INVENTORY_MOCK_MODE === 'false' 
    ? new NestInventoryService() 
    : new MockInventoryService()
}

// Export for easy use
export const authService = createAuthService()
export const serviceService = createServiceService()
export const productService = createProductService()
export const cartService = createCartService()
export const userService = createUserService()
export const inventoryService = createInventoryService()
