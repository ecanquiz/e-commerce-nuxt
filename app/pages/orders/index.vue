
<script setup lang="ts">
import {
  Package,
  Search,
  Filter,
  Download,
  Star,
  MessageCircle,
  Truck,
  CheckCircle,
  Clock,
  X,
  Eye,
  ArrowLeft,
  Calendar,
  MapPin,
  ExternalLink
} from 'lucide-vue-next';
//import type { Order } from '~~/shared/types';
import type { OrderTodo } from '~~/shared/types';

definePageMeta({
  // middleware: 'auth' // Proteger la página para usuarios autenticados
});

// Datos de ejemplo (en producción vendrían de una API)
//const orders: Order[] = [
const orders: OrderTodo[] = [
  {
    id: 'VY-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 25000,
    items: [
      {
        id: '1',
        name: 'Catena Zapata Malbec 2020',
        vineyard: 'Catena Zapata',
        quantity: 2,
        price: 15000,
        image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: '2',
        name: 'Catena Zapata Chardonnay 2021',
        vineyard: 'Catena Zapata',
        quantity: 1,
        price: 12000,
        image: 'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ],
    shipping: {
      address: 'Av. Corrientes 1234, Buenos Aires',
      method: 'Envío estándar',
      tracking: 'AR123456789'
    },
    shippingTracking: {
      id: 'track-001',
      orderId: 'VY-001',
      trackingNumber: 'AR123456789',
      provider: {
        id: 'oca',
        name: 'OCA',
        trackingUrl: 'https://www.oca.com.ar/seguimiento?numero={trackingNumber}',
        estimatedDays: 3,
        cost: 0,
        zones: ['CABA', 'GBA']
      },
      status: 'delivered',
      estimatedDelivery: '2024-01-18T16:00:00Z',
      actualDelivery: '2024-01-18T16:45:00Z',
      events: [
        {
          id: 'evt-1',
          status: 'Entregado',
          description: 'Paquete entregado exitosamente al destinatario',
          location: 'Buenos Aires, CABA',
          timestamp: '2024-01-18T16:45:00Z',
          isDelivered: true
        },
        {
          id: 'evt-2',
          status: 'En reparto',
          description: 'El paquete está en camino para la entrega',
          location: 'Centro de Distribución CABA',
          timestamp: '2024-01-18T08:30:00Z'
        },
        {
          id: 'evt-3',
          status: 'En tránsito',
          description: 'El paquete está en camino al centro de distribución',
          location: 'Mendoza - Buenos Aires',
          timestamp: '2024-01-17T09:15:00Z'
        },
        {
          id: 'evt-4',
          status: 'Recolectado',
          description: 'Paquete recolectado del viñedo',
          location: 'Bodega Catena Zapata, Mendoza',
          timestamp: '2024-01-16T14:20:00Z'
        }
      ],
      createdAt: '2024-01-16T14:20:00Z',
      updatedAt: '2024-01-18T16:45:00Z'
    },
    timeline: [
      { status: 'Pedido confirmado', date: '2024-01-15 10:30', completed: true },
      { status: 'Preparando envío', date: '2024-01-16 14:20', completed: true },
      { status: 'En camino', date: '2024-01-17 09:15', completed: true },
      { status: 'Entregado', date: '2024-01-18 16:45', completed: true }
    ]
  },
  // ... más órdenes
];

// Reactive state
const searchTerm = ref('');
const statusFilter = ref('all');
const dateFilter = ref('30');
const selectedOrder = ref<string | null>(null);

const statusOptions = [
  { value: 'all', label: 'Todos los pedidos' },
  { value: 'processing', label: 'Procesando' },
  { value: 'shipped', label: 'Enviados' },
  { value: 'delivered', label: 'Entregados' },
  { value: 'cancelled', label: 'Cancelados' }
];

// Computed
const filteredOrders = computed(() => {
  return orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         order.items.some(item => 
                           item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                           item.vineyard.toLowerCase().includes(searchTerm.value.toLowerCase())
                         );
    const matchesStatus = statusFilter.value === 'all' || order.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const selectedOrderData = computed(() => {
  return orders.find(order => order.id === selectedOrder.value);
});

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'text-green-600 bg-green-100';
    case 'shipped': return 'text-blue-600 bg-blue-100';
    case 'processing': return 'text-yellow-600 bg-yellow-100';
    case 'cancelled': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return CheckCircle;
    case 'shipped': return Truck;
    case 'processing': return Clock;
    case 'cancelled': return X;
    default: return Package;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'delivered': return 'Entregado';
    case 'shipped': return 'Enviado';
    case 'processing': return 'Procesando';
    case 'cancelled': return 'Cancelado';
    default: return status;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const refreshTracking = () => {
  console.log('Actualizando tracking...');
  // Lógica para actualizar el tracking
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Vista de detalle del pedido -->
    <div v-if="selectedOrder && selectedOrderData" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <button
          @click="selectedOrder = null"
          class="flex items-center text-burgundy-600 hover:text-burgundy-700 mb-4"
        >
          <ArrowLeft class="h-5 w-5 mr-2" />
          Volver a mis pedidos
        </button>
        <h1 class="text-3xl font-bold text-gray-900">
          Pedido #{{ selectedOrderData.id }}
        </h1>
        <p class="text-gray-600">
          Realizado el {{ formatDate(selectedOrderData.date) }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Detalles del Pedido -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Estado y Seguimiento -->
          <div v-if="selectedOrderData.shippingTracking" class="mb-6">
            <ShippingTracker 
              :tracking="selectedOrderData.shippingTracking"
              @refresh="refreshTracking"
            />
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Estado del Pedido</h2>
            
            <div class="space-y-4">
              <div
                v-for="(step, index) in selectedOrderData.timeline"
                :key="index"
                class="flex items-center space-x-4"
              >
                <div class="w-8 h-8 rounded-full flex items-center justify-center"
                  :class="step.completed ? 'bg-green-500' : 'bg-gray-300'"
                >
                  <CheckCircle v-if="step.completed" class="h-5 w-5 text-white" />
                  <div v-else class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div class="flex-1">
                  <p class="font-medium"
                    :class="step.completed ? 'text-gray-900' : 'text-gray-500'"
                  >
                    {{ step.status }}
                  </p>
                  <p v-if="step.date" class="text-sm text-gray-500">{{ step.date }}</p>
                </div>
              </div>
            </div>

            <div
              v-if="selectedOrderData.shipping.tracking && !selectedOrderData.shippingTracking"
              class="mt-6 p-4 bg-blue-50 rounded-lg"
            >
              <p class="text-sm font-medium text-blue-900">
                Número de seguimiento: {{ selectedOrderData.shipping.tracking }}
              </p>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1">
                Rastrear paquete
              </button>
            </div>
          </div>

          <!-- Productos -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Productos</h2>
            
            <div class="space-y-4">
              <div
                v-for="item in selectedOrderData.items"
                :key="item.id"
                class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">{{ item.vineyard }}</p>
                  <p class="text-sm text-gray-500">Cantidad: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">
                    ${{ (item.price * item.quantity).toLocaleString() }}
                  </p>
                  <p class="text-sm text-gray-500">
                    ${{ item.price.toLocaleString() }} c/u
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen y Acciones -->
        <div class="space-y-6">
          <!-- Resumen del Pedido -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Resumen</h3>
            
            <div class="space-y-2 mb-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">${{ selectedOrderData.total.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Envío</span>
                <span class="text-gray-900">Gratis</span>
              </div>
              <div class="border-t pt-2">
                <div class="flex justify-between">
                  <span class="font-bold text-gray-900">Total</span>
                  <span class="font-bold text-burgundy-600">
                    ${{ selectedOrderData.total.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <button class="w-full bg-burgundy-600 text-white py-2 rounded-md hover:bg-burgundy-700 transition-colors flex items-center justify-center">
                <Download class="h-4 w-4 mr-2" />
                Descargar Factura
              </button>
              
              <button
                v-if="selectedOrderData.status === 'delivered'"
                class="w-full bg-gold-600 text-white py-2 rounded-md hover:bg-gold-700 transition-colors flex items-center justify-center"
              >
                <Star class="h-4 w-4 mr-2" />
                Escribir Reseña
              </button>
              
              <button class="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center">
                <MessageCircle class="h-4 w-4 mr-2" />
                Contactar Soporte
              </button>
            </div>
          </div>

          <!-- Información de Envío -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Información de Envío</h3>
            
            <div class="space-y-3">
              <div>
                <p class="text-sm font-medium text-gray-700">Dirección</p>
                <p class="text-sm text-gray-600">{{ selectedOrderData.shipping.address }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Método de envío</p>
                <p class="text-sm text-gray-600">{{ selectedOrderData.shipping.method }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de lista de pedidos -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
        <p class="text-gray-600">Gestiona y rastrea todos tus pedidos</p>
      </div>

      <!-- Filtros -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="relative">
            <Search class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número de pedido, producto o viñedo..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
              v-model="searchTerm"
            />
          </div>
          
          <div class="relative">
            <Filter class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent appearance-none"
              v-model="statusFilter"
            >
              <option
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
          
          <div class="relative">
            <Calendar class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent appearance-none"
              v-model="dateFilter"
            >
              <option value="30">Últimos 30 días</option>
              <option value="90">Últimos 3 meses</option>
              <option value="365">Último año</option>
              <option value="all">Todos</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Lista de Pedidos -->
      <div class="space-y-6">
        <div v-if="filteredOrders.length === 0" class="bg-white rounded-lg shadow-sm p-12 text-center">
          <Package class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            No se encontraron pedidos
          </h3>
          <p class="text-gray-600 mb-6">
            {{ searchTerm || statusFilter !== 'all' 
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Aún no has realizado ningún pedido'
            }}
          </p>
          <NuxtLink
            to="/products"
            class="bg-burgundy-600 text-white px-6 py-3 rounded-lg hover:bg-burgundy-700 transition-colors"
          >
            Explorar Productos
          </NuxtLink>
        </div>

        <div
          v-else
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-white rounded-lg shadow-sm p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <component :is="getStatusIcon(order.status)" class="h-6 w-6 text-gray-400" />
              <div>
                <h3 class="text-lg font-bold text-gray-900">Pedido #{{ order.id }}</h3>
                <p class="text-sm text-gray-500">
                  {{ formatDate(order.date) }} • {{ order.items.length }} productos
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-gray-900">
                ${{ order.total.toLocaleString() }}
              </p>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                :class="getStatusColor(order.status)"
              >
                {{ getStatusLabel(order.status) }}
              </span>
            </div>
          </div>

          <!-- Productos del pedido -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div
              v-for="item in order.items.slice(0, 3)"
              :key="item.id"
              class="flex items-center space-x-3"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-12 h-12 object-cover rounded-lg"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ item.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ item.vineyard }} • Qty: {{ item.quantity }}
                </p>
              </div>
            </div>
            <div
              v-if="order.items.length > 3"
              class="flex items-center justify-center text-sm text-gray-500"
            >
              +{{ order.items.length - 3 }} productos más
            </div>
          </div>

          <!-- Acciones -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="flex space-x-3">
              <button
                @click="selectedOrder = order.id"
                class="flex items-center space-x-2 text-burgundy-600 hover:text-burgundy-700 font-medium"
              >
                <Eye class="h-4 w-4" />
                <span>Ver Detalles</span>
              </button>
              <button class="flex items-center space-x-2 text-gray-600 hover:text-gray-700 font-medium">
                <Download class="h-4 w-4" />
                <span>Factura</span>
              </button>
            </div>
            
            <div class="flex space-x-2">
              <button
                v-if="order.status === 'delivered'"
                class="flex items-center space-x-1 bg-gold-600 text-white px-3 py-1 rounded-md hover:bg-gold-700 transition-colors text-sm"
              >
                <Star class="h-3 w-3" />
                <span>Reseñar</span>
              </button>
              <button
                v-if="order.status === 'delivered' && order.shippingTracking"
                class="text-blue-600 hover:text-blue-900 mr-3"
                title="Ver seguimiento"
                @click="selectedOrder = order.id"
              >
                <Truck class="h-4 w-4" />
              </button>
              <button class="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors text-sm">
                <MessageCircle class="h-3 w-3" />
                <span>Soporte</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
