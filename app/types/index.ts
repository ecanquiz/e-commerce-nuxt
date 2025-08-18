export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'vineyard' | 'admin';
  vineyardId?: string;
  createdAt: string;
}

export interface AuthUser extends Omit<User, 'password'> {}

export interface Vineyard {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  coverImage: string;
  established: number;
  owner: string;
  phone: string;
  email: string;
  website?: string;
  services: Service[];
  gallery: string[];
  videos: string[];
  rating: number;
  reviewCount: number;
  products: Product[];
}

export interface Product {
  id: string;
  vineyardId: string;
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
  vineyard?: Vineyard;
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
  vineyard?: Vineyard; // TODO - TEMPORARILY undefined
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  shippingTracking?: ShippingTracking;
  vineyardOrders: VineyardOrder[];
  createdAt: string;
  updatedAt: string;
}

export interface VineyardOrder {
  id: string;
  orderId: string;
  vineyardId: string;
  items: CartItem[];
  subtotal: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'shipped' | 'delivered';
  estimatedPreparation: string;
  shippingTracking?: ShippingTracking;
  notes?: string;
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

export type LanguageCode =  "en" | "es" | "pt"

export interface Language {
    code: LanguageCode;
    name: string;
    flag: string;
}
