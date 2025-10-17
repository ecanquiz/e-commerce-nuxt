export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  bio: string;
  avatar: string;
}

export interface AddressProfile {
  id: string;
  type: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: string;
  lastFour: string;
  expiryDate: string;
  isDefault: boolean;
}

export interface OrderProfile {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  vineyard: string;
}

export interface FavoriteProduct {
  id: string;
  name: string;
  vineyard: string;
  price: number;
  image: string;
}

export interface Preferences {
  wineTypes: string[];
  priceRange: { min: number; max: number };
  notifications: {
    email: boolean;
    sms: boolean;
    promotions: boolean;
    orderUpdates: boolean;
  };
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Tab {
  id: string;
  label: string;
  icon: any;
}
