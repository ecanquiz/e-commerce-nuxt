<script setup lang="ts">
import {
  Package,
  TrendingUp,
  DollarSign,
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Save,
  Camera,
  Truck,
  AlertTriangle,
  History,
  Clock,
  CheckCircle,
  Minus,
  X
} from 'lucide-vue-next';
import type { Product } from '~~/shared/types';

// Types
interface Stat {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

interface Order {
  id: string;
  customerName: string;
  items: number;
  total: number;
  status: 'pending' | 'preparing';
  createdAt: string;
  estimatedPreparation: string;
}

interface VineyardProfile {
  name: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  establishedYear: number;
  owner: string;
}

interface StockMovement {
  date: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  stock: number;
}

// Reactive state
const activeTab = ref('overview');
const editingProfile = ref(false);
const showStockHistory = ref<string | null>(null);

// Data
const stats = ref<Stat[]>([
  {
    title: 'Productos Activos',
    value: '25',
    change: '+3',
    icon: Package,
    color: 'bg-blue-500'
  },
  {
    title: 'Ventas del Mes',
    value: '156',
    change: '+23%',
    icon: TrendingUp,
    color: 'bg-green-500'
  },
  {
    title: 'Ingresos',
    value: '$12,450',
    change: '+15%',
    icon: DollarSign,
    color: 'bg-purple-500'
  },
  {
    title: 'Calificación',
    value: '4.9',
    change: '+0.2',
    icon: Star,
    color: 'bg-yellow-500'
  }
]);

const products = ref<Product[]>([
  { 
    id: '1', 
    name: 'Malbec Reserva 2020', 
    price: 15000, 
    stock: 25, 
    status: 'active',
    vineyardId: '1',
    description: 'Descripción de Malbec Reserva 2020',
    category: 'red',
    vintage: 2020,
    alcoholContent: 14.5,
    volume: 750,
    stockHistory: [],
    image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    tasting_notes: 'Notas de cata',
    food_pairing: ['Carnes'],
    awards: [],
    createdAt: new Date().toISOString()
  },
  // ... otros productos
]);

const pendingOrders = ref<Order[]>([
  {
    id: 'VY-001',
    customerName: 'Juan Pérez',
    items: 3,
    total: 25000,
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    estimatedPreparation: '2024-01-16T18:00:00Z'
  },
  {
    id: 'VY-002',
    customerName: 'María García',
    items: 2,
    total: 18000,
    status: 'preparing',
    createdAt: '2024-01-14T15:20:00Z',
    estimatedPreparation: '2024-01-15T16:00:00Z'
  }
]);

const tabs = ref([
  { id: 'overview', label: 'Resumen' },
  { id: 'products', label: 'Productos' },
  { id: 'stock', label: 'Gestión de Stock' },
  { id: 'orders', label: 'Pedidos' },
  { id: 'profile', label: 'Perfil del Viñedo' },
  { id: 'gallery', label: 'Galería' },
  { id: 'services', label: 'Servicios' },
]);

const vineyardProfile = ref<VineyardProfile>({
  name: 'Bodega Catena Zapata',
  location: 'Mendoza, Argentina',
  phone: '+54 261 413-1100',
  email: 'info@catenazapata.com',
  website: 'https://www.catenazapata.com',
  description: 'Reconocida mundialmente por sus vinos de alta gama, Catena Zapata es pionera en la viticultura de altura en Argentina.',
  establishedYear: 1902,
  owner: 'Familia Catena'
});

const stockHistory = ref<StockMovement[]>([
  { date: '2024-01-15', type: 'out', quantity: -2, reason: 'Venta', stock: 23 },
  { date: '2024-01-10', type: 'in', quantity: 10, reason: 'Producción', stock: 25 },
  { date: '2024-01-05', type: 'adjustment', quantity: 0, reason: 'Inventario', stock: 15 },
]);

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Activo':
      return 'bg-green-100 text-green-800';
    case 'Agotado':
      return 'bg-red-100 text-red-800';
    case 'Pausado':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const handleUpdateStock = (productId: string, newStock: number, reason: string) => {
  console.log('Actualizando stock:', { productId, newStock, reason });
  // Implementar lógica de actualización de stock

    // Implementar lógica de actualización de stock
  // Ejemplo: actualizar el producto en el array
  //const index = products.value.findIndex(p => p.id === productId);
  //if (index !== -1) {
  //  products.value[index].stock = newStock;
  //}
};

const handleViewStockHistory = (productId: string) => {
  console.log('Ver historial de:', productId);
  showStockHistory.value = productId;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Panel del Viñedo</h1>
        <p class="text-gray-600">Gestiona tu viñedo y productos</p>
      </div>

      <!-- Navigation Tabs -->
      <div class="bg-white rounded-lg shadow-sm mb-8">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-4 px-1 border-b-2 font-medium text-sm"
              :class="activeTab === tab.id
                ? 'border-burgundy-500 text-burgundy-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Content -->
      <div v-if="activeTab === 'overview'">
        <div class="space-y-8">
          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="bg-white rounded-lg shadow-sm p-6"
            >
              <div class="flex items-center">
                <div :class="stat.color" class="rounded-lg p-3">
                  <component :is="stat.icon" class="h-6 w-6 text-white" />
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
                  <div class="flex items-center">
                    <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
                    <span class="ml-2 text-sm font-medium text-green-600">{{ stat.change }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Actividad Reciente</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p class="text-sm font-medium text-gray-900">Nueva venta: Malbec Reserva 2020</p>
                  <p class="text-sm text-gray-500">Hace 2 horas</p>
                </div>
                <span class="text-green-600 font-medium">+$15,000</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p class="text-sm font-medium text-gray-900">Producto agotado: Rosé Especial 2022</p>
                  <p class="text-sm text-gray-500">Hace 5 horas</p>
                </div>
                <span class="text-red-600 font-medium">Stock: 0</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <div>
                  <p class="text-sm font-medium text-gray-900">Nueva reseña recibida</p>
                  <p class="text-sm text-gray-500">Hace 1 día</p>
                </div>
                <div class="flex items-center">
                  <Star class="h-4 w-4 text-yellow-400 mr-1" />
                  <span class="text-yellow-600 font-medium">5.0</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pedidos Pendientes -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Pedidos Pendientes</h3>
              <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {{ pendingOrders.length }} pendientes
              </span>
            </div>
            <div class="space-y-3">
              <div
                v-for="order in pendingOrders"
                :key="order.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    Pedido #{{ order.id }} - {{ order.customerName }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ order.items }} productos • ${{ order.total.toLocaleString() }}
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-1 rounded-full"
                    :class="order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'"
                  >
                    {{ order.status === 'pending' ? 'Pendiente' : 'Preparando' }}
                  </span>
                  <button class="text-burgundy-600 hover:text-burgundy-700">
                    <Eye class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'products'">
        <div class="bg-white rounded-lg shadow-sm">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Gestión de Productos</h3>
            <button class="bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors flex items-center">
              <Plus class="h-4 w-4 mr-2" />
              Nuevo Producto
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="product in products" :key="product.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ product.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${{ product.price.toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ product.stock }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getStatusColor(product.stock > 0 ? 'Activo' : 'Agotado')"
                    >
                      {{ product.stock > 0 ? 'Activo' : 'Agotado' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-burgundy-600 hover:text-burgundy-900 mr-3">
                      <Eye class="h-4 w-4" />
                    </button>
                    <button class="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit class="h-4 w-4" />
                    </button>
                    <button class="text-red-600 hover:text-red-900">
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'stock'">
        <StockManager
          :products="products"
          @update-stock="handleUpdateStock"
          @view-history="handleViewStockHistory"
        />
      </div>

      <div v-else-if="activeTab === 'orders'">
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900">Gestión de Pedidos</h2>
            <div class="flex space-x-2">
              <select class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>Todos los estados</option>
                <option>Pendientes</option>
                <option>Preparando</option>
                <option>Listos</option>
                <option>Enviados</option>
              </select>
            </div>
          </div>

          <!-- Estadísticas de Pedidos -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-center">
                <Clock class="h-5 w-5 text-yellow-600 mr-2" />
                <span class="text-sm font-medium text-yellow-800">Pendientes</span>
              </div>
              <div class="text-2xl font-bold text-yellow-600 mt-2">
                {{ pendingOrders.filter(o => o.status === 'pending').length }}
              </div>
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-center">
                <Package class="h-5 w-5 text-blue-600 mr-2" />
                <span class="text-sm font-medium text-blue-800">Preparando</span>
              </div>
              <div class="text-2xl font-bold text-blue-600 mt-2">
                {{ pendingOrders.filter(o => o.status === 'preparing').length }}
              </div>
            </div>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center">
                <CheckCircle class="h-5 w-5 text-green-600 mr-2" />
                <span class="text-sm font-medium text-green-800">Listos</span>
              </div>
              <div class="text-2xl font-bold text-green-600 mt-2">0</div>
            </div>
            
            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-center">
                <Truck class="h-5 w-5 text-purple-600 mr-2" />
                <span class="text-sm font-medium text-purple-800">Enviados</span>
              </div>
              <div class="text-2xl font-bold text-purple-600 mt-2">0</div>
            </div>
          </div>

          <!-- Lista de Pedidos -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Productos
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="order in pendingOrders"
                    :key="order.id"
                    class="hover:bg-gray-50"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">#{{ order.id }}</div>
                      <div class="text-sm text-gray-500">
                        {{ new Date(order.createdAt).toLocaleDateString('es-AR') }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ order.customerName }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ order.items }} productos
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${{ order.total.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                        :class="order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'"
                      >
                        {{ order.status === 'pending' ? 'Pendiente' : 'Preparando' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-2">
                        <button class="text-burgundy-600 hover:text-burgundy-900">
                          <Eye class="h-4 w-4" />
                        </button>
                        <button class="text-green-600 hover:text-green-900">
                          <CheckCircle class="h-4 w-4" />
                        </button>
                        <button class="text-blue-600 hover:text-blue-900">
                          <Truck class="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'profile'">
        <div class="bg-white rounded-lg shadow-sm">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Perfil del Viñedo</h3>
            <button
              @click="editingProfile = !editingProfile"
              class="bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors flex items-center"
            >
              <component :is="editingProfile ? Save : Edit" class="h-4 w-4 mr-2" />
              {{ editingProfile ? 'Guardar' : 'Editar' }}
            </button>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Viñedo
                  </label>
                  <input
                    type="text"
                    :disabled="!editingProfile"
                    :value="vineyardProfile.name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    :disabled="!editingProfile"
                    :value="vineyardProfile.location"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    :disabled="!editingProfile"
                    :value="vineyardProfile.phone"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    :disabled="!editingProfile"
                    :value="vineyardProfile.email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Sitio Web
                  </label>
                  <input
                    type="url"
                    :disabled="!editingProfile"
                    :value="vineyardProfile.website"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    rows="6"
                    :disabled="!editingProfile"
                    :value="vineyardProfile.description"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Año de Establecimiento
                  </label>
                  <input
                    type="number"
                    :disabled="!editingProfile"
                    :value="vineyardProfile.establishedYear"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Propietario
                  </label>
                  <input
                    type="text"
                    :disabled="!editingProfile"
                    :value="vineyardProfile.owner"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'gallery'">
        <div class="bg-white rounded-lg shadow-sm">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Galería de Imágenes</h3>
            <button class="bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors flex items-center">
              <Upload class="h-4 w-4 mr-2" />
              Subir Imágenes
            </button>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="index in 6"
                :key="index"
                class="relative group"
              >
                <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400"
                    :alt="`Galería ${index}`"
                    class="w-full h-48 object-cover"
                  />
                </div>
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                      <Eye class="h-4 w-4" />
                    </button>
                    <button class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                <div class="text-center">
                  <Camera class="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p class="text-sm text-gray-500">Agregar nueva imagen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'stock'">
        <StockManager
         :products="products"
          @update-stock="handleUpdateStock"
          @view-history="handleViewStockHistory"
        />
      </div>

      <div v-else>
        <div class="bg-white rounded-lg shadow-sm p-8 text-center">
          <AlertTriangle class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Sección en Desarrollo
          </h3>
          <p class="text-gray-600">
            Esta funcionalidad estará disponible próximamente.
          </p>
        </div>
      </div>
    </div>

    <!-- Modal de Historial de Stock -->
    <div
      v-if="showStockHistory"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Historial de Stock
          </h3>
          <button
            @click="showStockHistory = null"
            class="text-gray-400 hover:text-gray-600"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(movement, index) in stockHistory"
            :key="index"
            class="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center"
                :class="{
                  'bg-green-100': movement.type === 'in',
                  'bg-red-100': movement.type === 'out',
                  'bg-blue-100': movement.type === 'adjustment'
                }"
              >
                <component
                  :is="movement.type === 'in' ? Plus : movement.type === 'out' ? Minus : Edit"
                  class="h-4 w-4"
                  :class="{
                    'text-green-600': movement.type === 'in',
                    'text-red-600': movement.type === 'out',
                    'text-blue-600': movement.type === 'adjustment'
                  }"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ movement.reason }}</p>
                <p class="text-xs text-gray-500">{{ movement.date }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium"
                :class="{
                  'text-green-600': movement.type === 'in',
                  'text-red-600': movement.type === 'out',
                  'text-blue-600': movement.type === 'adjustment'
                }"
              >
                {{ movement.type === 'in' ? '+' : movement.type === 'out' ? '' : '=' }}{{ movement.quantity }}
              </p>
              <p class="text-xs text-gray-500">Stock: {{ movement.stock }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

