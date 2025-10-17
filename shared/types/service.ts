import type { ServiceCategory } from './category'

export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string; //- > long_description
  category: ServiceCategory;
  price?: number;
  duration?: number; // duration_minutes
  capacity?: number;
  images: string[];
  videos: string[];
  features: string[];
  schedule: string; // JSON with schedules
  calComLink?: string; // From legacy to cal_com_link
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
