//import { createClient } from '@supabase/supabase-js'

//const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co'
//const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw'

//export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Category {
  id: string
  name: string
  description: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  category_id: string
  vintage_year: number
  alcohol_content: number
  grape_variety: string
  region: string
  price: number
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
  category?: Category
}

export interface Inventory {
  id: string
  product_id: string
  current_stock: number
  reserved_stock: number
  minimum_stock: number
  maximum_stock: number
  last_updated: string
  updated_by: string
  product?: Product
}

export interface ProductWithInventory extends Product {
  inventory?: Inventory
}