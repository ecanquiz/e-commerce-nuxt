import type { ProductLegacy } from './product'

export interface CartItem {
  product: ProductLegacy;
  quantity: number;
}

