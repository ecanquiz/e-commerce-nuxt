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
