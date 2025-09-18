<script setup lang="ts">
import {
  Users,
  Grape,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Package,
  Star,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-vue-next';


definePageMeta({
  //layout: 'admin', // Layout específico para administración
  //middleware: ['auth', 'admin'], // Middleware para verificar autenticación y permisos de admin
});


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
  customer: string;
  vineyard: string;
  amount: string;
  status: string;
}

interface Vineyard {
  id: string;
  name: string;
  owner: string;
  products: number;
  status: string;
  rating: number;
}

interface Tab {
  id: string;
  label: string;
  icon: any;
}

// Reactive state
const activeTab = ref('overview');

// Data
const stats = ref<Stat[]>([
  {
    title: 'Total Usuarios',
    value: '2,847',
    change: '+12%',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Viñedos Activos',
    value: '156',
    change: '+8%',
    icon: Grape,
    color: 'bg-green-500'
  },
  {
    title: 'Pedidos del Mes',
    value: '1,234',
    change: '+23%',
    icon: ShoppingCart,
    color: 'bg-purple-500'
  },
  {
    title: 'Ingresos Totales',
    value: '$45,678',
    change: '+15%',
    icon: DollarSign,
    color: 'bg-yellow-500'
  }
]);

const recentOrders = ref<Order[]>([
  { id: '001', customer: 'Juan Pérez', vineyard: 'Catena Zapata', amount: '$2,500', status: 'Completado' },
  { id: '002', customer: 'María García', vineyard: 'Norton', amount: '$1,800', status: 'Procesando' },
  { id: '003', customer: 'Carlos López', vineyard: 'Rutini', amount: '$3,200', status: 'Enviado' },
  { id: '004', customer: 'Ana Martínez', vineyard: 'Salentein', amount: '$1,500', status: 'Pendiente' },
]);

const vineyards = ref<Vineyard[]>([
  { id: '1', name: 'Catena Zapata', owner: 'Familia Catena', products: 25, status: 'Activo', rating: 4.9 },
  { id: '2', name: 'Norton', owner: 'Familia Norton', products: 18, status: 'Activo', rating: 4.7 },
  { id: '3', name: 'Rutini', owner: 'Grupo Rutini', products: 22, status: 'Activo', rating: 4.8 },
  { id: '4', name: 'Salentein', owner: 'Familia Pon', products: 15, status: 'Pendiente', rating: 4.9 },
]);

const tabs = ref<Tab[]>([
  { id: 'overview', label: 'Resumen', icon: TrendingUp },
  { id: 'users', label: 'Usuarios', icon: Users },
  { id: 'vineyards', label: 'Viñedos', icon: Grape },
  { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
  { id: 'products', label: 'Productos', icon: Package },
]);

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completado':
    case 'Activo':
      return 'bg-green-100 text-green-800';
    case 'Procesando':
    case 'Enviado':
      return 'bg-blue-100 text-blue-800';
    case 'Pendiente':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Actions handlers (pueden ser implementados según necesidad)
const viewOrder = (orderId: string) => {
  console.log('View order:', orderId);
  // Navegar a la página de detalle del pedido
};

const editOrder = (orderId: string) => {
  console.log('Edit order:', orderId);
  // Abrir modal de edición
};

const viewVineyard = (vineyardId: string) => {
  console.log('View vineyard:', vineyardId);
  // Navegar a la página del viñedo
};

const editVineyard = (vineyardId: string) => {
  console.log('Edit vineyard:', vineyardId);
  // Abrir modal de edición
};

const deleteVineyard = (vineyardId: string) => {
  console.log('Delete vineyard:', vineyardId);
  // Mostrar confirmación y eliminar
};

const addNewVineyard = () => {
  console.log('Add new vineyard');
  // Abrir modal de creación
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Panel Administrativo</h1>
        <p class="text-gray-600">Gestiona toda la plataforma desde aquí</p>
      </div>

      <!-- Navigation Tabs -->
      <div class="bg-white rounded-lg shadow-sm mb-8">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2"
              :class="activeTab === tab.id
                ? 'border-burgundy-500 text-burgundy-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'"
            >
              <component :is="tab.icon" class="h-5 w-5" />
              <span>{{ tab.label }}</span>
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

          <!-- Recent Orders -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Pedidos Recientes</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Viñedo
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monto
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
                  <tr v-for="order in recentOrders" :key="order.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{{ order.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ order.customer }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ order.vineyard }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ order.amount }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusColor(order.status)">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button class="text-burgundy-600 hover:text-burgundy-900 mr-3">
                        <Eye class="h-4 w-4" />
                      </button>
                      <button class="text-blue-600 hover:text-blue-900">
                        <Edit class="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'vineyards'">
        <div class="bg-white rounded-lg shadow-sm">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Gestión de Viñedos</h3>
            <button class="bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors flex items-center">
              <Plus class="h-4 w-4 mr-2" />
              Nuevo Viñedo
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Viñedo
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Propietario
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Productos
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calificación
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
                <tr v-for="vineyard in vineyards" :key="vineyard.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ vineyard.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ vineyard.owner }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ vineyard.products }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div class="flex items-center">
                      <Star class="h-4 w-4 text-yellow-400 mr-1" />
                      {{ vineyard.rating }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusColor(vineyard.status)">
                      {{ vineyard.status }}
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

      <!-- Placeholder for other tabs -->
      <div v-else class="bg-white rounded-lg shadow-sm p-8 text-center">
        <AlertCircle class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Sección en Desarrollo
        </h3>
        <p class="text-gray-600">
          Esta funcionalidad estará disponible próximamente.
        </p>
      </div>
    </div>
  </div>
</template>
