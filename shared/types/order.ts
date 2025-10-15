import type { CartItem } from "./cart";

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  shippingTracking?: ShippingTracking;
  subOrders: SubOrder[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderTodo {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  shipping: ShippingInfo;
  shippingTracking?: ShippingTracking;
  timeline: TimelineStep[];
}

export interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isDelivered?: boolean;
}

export interface ShippingInfo {
  address: string;
  method: string;
  tracking?: string;
}

export interface ShippingProvider {
  id: string;
  name: string;
  trackingUrl: string;
  estimatedDays: number;
  cost: number;
  zones: string[];
}

export interface ShippingTracking {
  id: string;
  orderId: string;
  trackingNumber: string;
  provider: ShippingProvider;
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed';
  estimatedDelivery: string;
  actualDelivery?: string;
  events: TrackingEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineStep {
  status: string;
  date: string;
  completed: boolean;
}

export interface SubOrder {
  id: string;
  orderId: string;
  items: CartItem[];
  subtotal: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'shipped' | 'delivered';
  estimatedPreparation: string;
  shippingTracking?: ShippingTracking;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
