import { Category, Product, Inventory } from '~~/shared/types/inventory';

export const categories: Category[] = [
  { id: '1', name: 'Tinto', description: 'Vinos tintos con cuerpo y estructura', created_at: new Date().toISOString() },
  { id: '2', name: 'Blanco', description: 'Vinos blancos frescos y aromáticos', created_at: new Date().toISOString() },
  { id: '3', name: 'Rosado', description: 'Vinos rosados ligeros y afrutados', created_at: new Date().toISOString() },
  { id: '4', name: 'Espumoso', description: 'Vinos espumosos y champagnes', created_at: new Date().toISOString() },
  { id: '5', name: 'Dulce', description: 'Vinos dulces y de postre', created_at: new Date().toISOString() },
  { id: '6', name: 'Fortificado', description: 'Vinos fortificados como Oporto y Jerez', created_at: new Date().toISOString() },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Reserva Cabernet Sauvignon 2021',
    description: 'Vino tinto de cuerpo completo con notas de cassis, cedro y vainilla. Envejecido 12 meses en barricas de roble francés.',
    category_id: '1',
    vintage_year: 2021,
    alcohol_content: 14.5,
    grape_variety: 'Cabernet Sauvignon',
    region: 'Valle de Uco, Mendoza',
    price: 45.99,
    image_url: 'https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Chardonnay Premium 2022',
    description: 'Vino blanco elegante con aromas florales y cítricos, con un toque mineral y final persistente.',
    category_id: '2',
    vintage_year: 2022,
    alcohol_content: 13.0,
    grape_variety: 'Chardonnay',
    region: 'Valle de Casablanca, Chile',
    price: 32.50,
    image_url: 'https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Rosé de Malbec 2023',
    description: 'Rosado fresco y afrutado, ideal para aperitivos y comidas ligeras. Notas de fresa y durazno.',
    category_id: '3',
    vintage_year: 2023,
    alcohol_content: 12.5,
    grape_variety: 'Malbec',
    region: 'San Rafael, Mendoza',
    price: 28.75,
    image_url: 'https://images.pexels.com/photos/1170099/pexels-photo-1170099.jpeg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Espumante Brut Nature',
    description: 'Espumante método tradicional, sin dosaje. Burbujas finas y persistentes con notas cítricas.',
    category_id: '4',
    vintage_year: 2020,
    alcohol_content: 12.0,
    grape_variety: 'Chardonnay, Pinot Noir',
    region: 'Patagonia, Argentina',
    price: 55.00,
    image_url: 'https://images.pexels.com/photos/5946984/pexels-photo-5946984.jpeg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const inventory: Inventory[] = [
  {
    id: '1',
    product_id: '1',
    current_stock: 42,
    reserved_stock: 0,
    minimum_stock: 15,
    maximum_stock: 100,
    last_updated: new Date().toISOString(),
    updated_by: 'system - sample data'
  },
  {
    id: '2',
    product_id: '2',
    current_stock: 28,
    reserved_stock: 0,
    minimum_stock: 15,
    maximum_stock: 100,
    last_updated: new Date().toISOString(),
    updated_by: 'system - sample data'
  },
  {
    id: '3',
    product_id: '3',
    current_stock: 15,
    reserved_stock: 0,
    minimum_stock: 15,
    maximum_stock: 100,
    last_updated: new Date().toISOString(),
    updated_by: 'system - sample data'
  },
  {
    id: '4',
    product_id: '4',
    current_stock: 8, // Low stock for demonstration
    reserved_stock: 0,
    minimum_stock: 15,
    maximum_stock: 100,
    last_updated: new Date().toISOString(),
    updated_by: 'system - sample data'
  }
];
