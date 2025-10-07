export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'vineyard' | 'admin';
  vineyardId?: string;
  createdAt: string;
}
export interface ApiUser {
  id: string;
  email: string;
  // password is intentionally omitted from API responses for security
  name?: string;
  is_email_verified?: boolean;
  email_verification_token?: string | null;
  password_reset_token?: string | null;
  password_reset_expires?: string | null;
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
export interface UserListResponse {
  users: ApiUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface AuthUser extends Omit<User, 'password'> { }

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'red' | 'white' | 'rose' | 'sparkling' | 'dessert';
  vintage: number;
  alcoholContent: number;
  volume: number;
  stock: number;
  stockHistory: StockMovement[];
  image: string;
  images: string[];
  tasting_notes: string;
  food_pairing: string[];
  awards: string[];
  createdAt: string;
  status?: 'active' | 'inactive' | 'discontinued';
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  orderId?: string;
  createdAt: string;
  createdBy: string;
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

export interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isDelivered?: boolean;
}
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  shippingTracking?: ShippingTracking;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price?: number;
  duration?: string;
  capacity?: number;
  images: string[];
  videos: string[];
  features: string[];
  schedule: string;
  calComLink?: string;
  category: 'tasting' | 'tour' | 'event' | 'restaurant' | 'direct_sale' | 'accommodation';
}

export interface AuthContext {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export type LanguageCode = "en" | "es" | "pt"

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}


export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  type: 'discount' | 'free-shipping' | 'special-offer';
}

export interface OrderItem {
  id: string;
  name: string;
  vineyard: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingInfo {
  address: string;
  method: string;
  tracking?: string;
}

export interface TimelineStep {
  status: string;
  date: string;
  completed: boolean;
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

export interface CarouselSlides {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}
