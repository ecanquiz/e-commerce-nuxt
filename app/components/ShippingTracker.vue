<script setup lang="ts">
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  RefreshCw
} from 'lucide-vue-next';
import type { ShippingTracking, TrackingEvent } from '~~/shared/types';

// Props
const props = defineProps<{
  tracking: ShippingTracking;
  onRefresh?: () => void;
}>();

// Emits
const emit = defineEmits<{
  (e: 'refresh'): void;
}>();

// Reactive state
const copied = ref(false);

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'text-green-600 bg-green-100';
    case 'out_for_delivery': return 'text-blue-600 bg-blue-100';
    case 'in_transit': return 'text-yellow-600 bg-yellow-100';
    case 'picked_up': return 'text-purple-600 bg-purple-100';
    case 'failed': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return CheckCircle;
    case 'out_for_delivery': return Truck;
    case 'in_transit': return Package;
    case 'picked_up': return Package;
    case 'failed': return AlertCircle;
    default: return Clock;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'Pendiente';
    case 'picked_up': return 'Recolectado';
    case 'in_transit': return 'En tránsito';
    case 'out_for_delivery': return 'En reparto';
    case 'delivered': return 'Entregado';
    case 'failed': return 'Fallido';
    default: return status;
  }
};

const copyTrackingNumber = async () => {
  try {
    await navigator.clipboard.writeText(props.tracking.trackingNumber);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
  }
};

const openProviderTracking = () => {
  const url = props.tracking.provider.trackingUrl.replace('{trackingNumber}', props.tracking.trackingNumber);
  window.open(url, '_blank');
};

const handleRefresh = () => {
  if (props.onRefresh) {
    props.onRefresh();
  }
  emit('refresh');
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <component :is="getStatusIcon(tracking.status)" class="h-8 w-8 text-burgundy-600" />
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              Seguimiento de Envío
            </h3>
            <p class="text-sm text-gray-600">
              {{ tracking.provider.name }}
            </p>
          </div>
        </div>
        <div class="text-right">
          <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full" :class="getStatusColor(tracking.status)">
            {{ getStatusLabel(tracking.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Tracking Info -->
    <div class="p-6 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Número de Seguimiento
          </label>
          <div class="flex items-center space-x-2">
            <code class="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
              {{ tracking.trackingNumber }}
            </code>
            <button
              @click="copyTrackingNumber"
              class="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Copiar número"
            >
              <Copy class="h-4 w-4" />
            </button>
            <span v-if="copied" class="text-xs text-green-600">¡Copiado!</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Entrega Estimada
          </label>
          <div class="flex items-center space-x-2">
            <Clock class="h-4 w-4 text-gray-400" />
            <span class="text-sm text-gray-900">
              {{ formatDate(tracking.estimatedDelivery) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex space-x-3">
        <button
          @click="openProviderTracking"
          class="flex items-center space-x-2 bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors"
        >
          <ExternalLink class="h-4 w-4" />
          <span>Ver en {{ tracking.provider.name }}</span>
        </button>
        <button
          v-if="onRefresh"
          @click="handleRefresh"
          class="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          <RefreshCw class="h-4 w-4" />
          <span>Actualizar</span>
        </button>
      </div>
    </div>

    <!-- Timeline -->
    <div class="p-6 border-t border-gray-200">
      <h4 class="text-lg font-semibold text-gray-900 mb-4">
        Historial de Seguimiento
      </h4>
      
      <div class="space-y-4">
        <div
          v-for="(event, index) in tracking.events"
          :key="event.id"
          class="flex items-start space-x-4"
        >
          <div class="flex-shrink-0 w-3 h-3 rounded-full mt-2"
            :class="{
              'bg-green-500': event.isDelivered,
              'bg-burgundy-500': index === 0,
              'bg-gray-300': !event.isDelivered && index !== 0
            }"
          ></div>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium"
                :class="event.isDelivered ? 'text-green-900' : 'text-gray-900'"
              >
                {{ event.status }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatDateTime(event.timestamp) }}
              </p>
            </div>
            <p class="text-sm text-gray-600 mt-1">
              {{ event.description }}
            </p>
            <div v-if="event.location" class="flex items-center mt-1">
              <MapPin class="h-3 w-3 text-gray-400 mr-1" />
              <p class="text-xs text-gray-500">{{ event.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delivered Info -->
    <div
      v-if="tracking.status === 'delivered' && tracking.actualDelivery"
      class="p-6 bg-green-50 border-t border-green-200"
    >
      <div class="flex items-center space-x-2">
        <CheckCircle class="h-5 w-5 text-green-600" />
        <span class="text-sm font-medium text-green-900">
          Entregado el {{ formatDate(tracking.actualDelivery) }}
        </span>
      </div>
    </div>
  </div>
</template>
