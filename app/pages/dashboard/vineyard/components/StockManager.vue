<script setup lang="ts">
import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Plus,
  Minus,
  Edit,
  History,
  Save,
  X
} from 'lucide-vue-next';
import type { Product } from '~~/shared/types';

// Types
interface StockAdjustment {
  productId: string;
  quantity: number;
  reason: string;
  type: 'in' | 'out' | 'adjustment';
}

interface ReasonOption {
  value: string;
  label: string;
}

interface StockStatus {
  color: string;
  label: string;
}

// Props
const props = defineProps<{
  products: Product[];
}>();

// Emits
const emit = defineEmits<{
  (e: 'update-stock', productId: string, newStock: number, reason: string): void;
  (e: 'view-history', productId: string): void;
}>();

// Reactive state
const stockAdjustment = ref<StockAdjustment | null>(null);

// Computed properties
const outOfStockCount = computed(() => 
  props.products.filter(p => p.stock === 0).length
);

const lowStockCount = computed(() => 
  props.products.filter(p => p.stock > 0 && p.stock <= 5).length
);

const normalStockCount = computed(() => 
  props.products.filter(p => p.stock > 5).length
);

const reasonOptions = computed<ReasonOption[]>(() => {
  if (!stockAdjustment.value) return [];
  
  const options: Record<string, ReasonOption[]> = {
    in: [
      { value: 'Compra', label: 'Compra' },
      { value: 'Producción', label: 'Producción' },
      { value: 'Devolución', label: 'Devolución' },
      { value: 'Corrección', label: 'Corrección' }
    ],
    out: [
      { value: 'Venta', label: 'Venta' },
      { value: 'Rotura', label: 'Rotura' },
      { value: 'Vencimiento', label: 'Vencimiento' },
      { value: 'Muestra', label: 'Muestra' }
    ],
    adjustment: [
      { value: 'Inventario', label: 'Inventario' },
      { value: 'Corrección', label: 'Corrección' },
      { value: 'Ajuste inicial', label: 'Ajuste inicial' }
    ]
  };

  return options[stockAdjustment.value.type] || [];
});

// Methods
const getStockStatus = (stock: number): StockStatus => {
  if (stock === 0) return { color: 'text-red-600 bg-red-100', label: 'Sin Stock' };
  if (stock <= 5) return { color: 'text-yellow-600 bg-yellow-100', label: 'Stock Bajo' };
  if (stock <= 20) return { color: 'text-blue-600 bg-blue-100', label: 'Stock Normal' };
  return { color: 'text-green-600 bg-green-100', label: 'Stock Alto' };
};

const getAdjustmentTitle = (type: string): string => {
  switch (type) {
    case 'in': return 'Agregar Stock';
    case 'out': return 'Reducir Stock';
    case 'adjustment': return 'Ajustar Stock';
    default: return 'Ajuste de Stock';
  }
};

const handleStockAdjustment = (productId: string, type: 'in' | 'out' | 'adjustment') => {
  stockAdjustment.value = {
    productId,
    quantity: 0,
    reason: '',
    type
  };
};

const updateAdjustmentQuantity = (value: string) => {
  if (stockAdjustment.value) {
    stockAdjustment.value = {
      ...stockAdjustment.value,
      quantity: parseInt(value) || 0
    };
  }
};

const updateAdjustmentReason = (reason: string) => {
  if (stockAdjustment.value) {
    stockAdjustment.value = {
      ...stockAdjustment.value,
      reason
    };
  }
};

const submitStockAdjustment = () => {
  if (!stockAdjustment.value) return;
  
  const product = props.products.find(p => p.id === stockAdjustment.value!.productId);
  if (!product) return;

  let newStock = product.stock;
  
  if (stockAdjustment.value.type === 'in') {
    newStock += stockAdjustment.value.quantity;
  } else if (stockAdjustment.value.type === 'out') {
    newStock = Math.max(0, product.stock - stockAdjustment.value.quantity);
  } else {
    newStock = stockAdjustment.value.quantity;
  }

  emit('update-stock', stockAdjustment.value.productId, newStock, stockAdjustment.value.reason);
  stockAdjustment.value = null;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Gestión de Stock</h2>
      <div class="flex items-center space-x-4">
        <div class="text-sm text-gray-600">
          Total productos: {{ products.length }}
        </div>
        <div class="text-sm text-gray-600">
          Sin stock: {{ outOfStockCount }}
        </div>
      </div>
    </div>

    <!-- Stock Alerts -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-center">
          <AlertTriangle class="h-5 w-5 text-red-600 mr-2" />
          <span class="text-sm font-medium text-red-800">Sin Stock</span>
        </div>
        <div class="text-2xl font-bold text-red-600 mt-2">
          {{ outOfStockCount }}
        </div>
      </div>
      
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div class="flex items-center">
          <TrendingDown class="h-5 w-5 text-yellow-600 mr-2" />
          <span class="text-sm font-medium text-yellow-800">Stock Bajo</span>
        </div>
        <div class="text-2xl font-bold text-yellow-600 mt-2">
          {{ lowStockCount }}
        </div>
      </div>
      
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-center">
          <TrendingUp class="h-5 w-5 text-green-600 mr-2" />
          <span class="text-sm font-medium text-green-800">Stock Normal</span>
        </div>
        <div class="text-2xl font-bold text-green-600 mt-2">
          {{ normalStockCount }}
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Actual
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="product in products"
              :key="product.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="h-10 w-10 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ product.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ product.category }} • {{ product.vintage }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-2xl font-bold text-gray-900">
                  {{ product.stock }}
                </div>
                <div class="text-sm text-gray-500">unidades</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStockStatus(product.stock).color">
                  {{ getStockStatus(product.stock).label }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ product.price.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="handleStockAdjustment(product.id, 'in')"
                    class="text-green-600 hover:text-green-900"
                    title="Agregar stock"
                  >
                    <Plus class="h-4 w-4" />
                  </button>
                  <button
                    @click="handleStockAdjustment(product.id, 'out')"
                    class="text-red-600 hover:text-red-900"
                    title="Reducir stock"
                  >
                    <Minus class="h-4 w-4" />
                  </button>
                  <button
                    @click="handleStockAdjustment(product.id, 'adjustment')"
                    class="text-blue-600 hover:text-blue-900"
                    title="Ajustar stock"
                  >
                    <Edit class="h-4 w-4" />
                  </button>
                  <button
                    @click="$emit('view-history', product.id)"
                    class="text-gray-600 hover:text-gray-900"
                    title="Ver historial"
                  >
                    <History class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Stock Adjustment Modal -->
    <div
      v-if="stockAdjustment"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ getAdjustmentTitle(stockAdjustment.type) }}
          </h3>
          <button
            @click="stockAdjustment = null"
            class="text-gray-400 hover:text-gray-600"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ stockAdjustment.type === 'adjustment' ? 'Nuevo Stock' : 'Cantidad' }}
            </label>
            <input
              type="number"
              min="0"
              :value="stockAdjustment.quantity"
              @input="updateAdjustmentQuantity(($event.target as HTMLInputElement).value)"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Motivo
            </label>
            <select
              :value="stockAdjustment.reason"
              @change="updateAdjustmentReason(($event.target as HTMLInputElement).value)"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
            >
              <option value="">Seleccionar motivo</option>
              <option
                v-for="option in reasonOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="flex space-x-3 pt-4">
            <button
              @click="submitStockAdjustment"
              :disabled="!stockAdjustment.reason || stockAdjustment.quantity < 0"
              class="flex-1 bg-burgundy-600 text-white py-2 px-4 rounded-md hover:bg-burgundy-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Save class="h-4 w-4 mr-2" />
              Confirmar
            </button>
            <button
              @click="stockAdjustment = null"
              class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

