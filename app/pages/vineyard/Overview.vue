<script setup lang="ts">
import { 
  MapPin, ExternalLink, Users, Award, Calendar, 
  Phone, Mail, Globe 
} from 'lucide-vue-next';
import type { Product, Vineyard } from '~~/shared/types';

const props = defineProps<{
  vineyard: Vineyard;
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: 'update:activeTab', value: string): void;
  (e: 'openProductModal', product: Product, vineyard: Vineyard): void;
}>();

const activeTab = computed({
  get: () => props.activeTab,
  set: (value) => emit('update:activeTab', value)
});

const getGoogleMapsUrl = (location: string) => { 
  const encodedLocation = encodeURIComponent(location);
  const runtimeConfig = useRuntimeConfig();
  const { public: { googleMapApiKey, googleMapApiUrl } } = runtimeConfig;
  
  if (!googleMapApiKey || !googleMapApiUrl) {
    console.error('Google Maps API key or URL is not defined in runtime config');
    return '';
  }

  return `${googleMapApiUrl}?key=${googleMapApiKey}&q=${encodedLocation}`;
};

const openProductWithDelay = (product: Product) => {
  activeTab.value = 'products';
  setTimeout(() => {
    emit('openProductModal', product, props.vineyard);
  }, 100);
};
</script>

<template>
  <div v-if="activeTab === 'overview'" class="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <div class="lg:col-span-2">
      <!-- Descripción -->
      <div class="p-6 mb-6 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-2xl font-bold text-gray-900">Acerca del Viñedo</h2>
        <p class="mb-6 leading-relaxed text-gray-700">{{ vineyard.description }}</p>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-3 text-lg font-semibold text-gray-900">Información</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <Users class="w-5 h-5 mr-3 text-gray-400" />
                <span class="text-gray-700">Propietario: {{ vineyard.owner }}</span>
              </div>
              <div class="flex items-center">
                <Award class="w-5 h-5 mr-3 text-gray-400" />
                <span class="text-gray-700">{{ vineyard.products.length }} productos</span>
              </div>
              <div class="flex items-center">
                <Calendar class="w-5 h-5 mr-3 text-gray-400" />
                <span class="text-gray-700">Fundado en {{ vineyard.established }}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="mb-3 text-lg font-semibold text-gray-900">Contacto</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <Phone class="w-5 h-5 mr-3 text-gray-400" />
                <span class="text-gray-700">{{ vineyard.phone }}</span>
              </div>
              <div class="flex items-center">
                <Mail class="w-5 h-5 mr-3 text-gray-400" />
                <span class="text-gray-700">{{ vineyard.email }}</span>
              </div>
              <div v-if="vineyard.website" class="flex items-center">
                <Globe class="w-5 h-5 mr-3 text-gray-400" />
                <a :href="vineyard.website" class="text-burgundy-600 hover:text-burgundy-700" target="_blank" rel="noopener noreferrer">
                  {{ vineyard.website }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ubicación con Google Maps -->
      <div class="p-6 bg-white rounded-lg shadow-sm">
        <h3 class="flex items-center mb-4 text-xl font-bold text-gray-900">
          <MapPin class="w-6 h-6 mr-2 text-burgundy-600" />
          Ubicación
        </h3>
        <div class="mb-4">
          <p class="mb-2 text-gray-700">{{ vineyard.location }}</p>
          <a
            :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vineyard.location)}`"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-sm text-burgundy-600 hover:text-burgundy-700"
          >
            Ver en Google Maps
            <ExternalLink class="w-4 h-4 ml-1" />
          </a>
        </div>
        <div class="w-full h-64 overflow-hidden bg-gray-200 rounded-lg">
          <iframe
            :src="getGoogleMapsUrl(vineyard.location)"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :title="`Ubicación de ${vineyard.name}`"
          ></iframe>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="p-6 mb-6 bg-white rounded-lg shadow-sm">
        <h3 class="mb-4 text-xl font-bold text-gray-900">Estadísticas</h3>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <button 
            @click="activeTab = 'products'"
            class="p-4 text-center transition-colors rounded-lg cursor-pointer bg-burgundy-50 hover:bg-burgundy-100 group"
          >
            <div class="text-2xl font-bold text-burgundy-600">{{ vineyard.products.length }}</div>
            <div class="text-sm text-gray-600 group-hover:text-burgundy-700">Productos</div>
            <div class="mt-1 text-xs transition-opacity opacity-0 text-burgundy-500 group-hover:opacity-100">
              Ver todos →
            </div>
          </button>
          <button 
            @click="activeTab = 'services'"
            class="p-4 text-center transition-colors rounded-lg cursor-pointer bg-gold-50 hover:bg-gold-100 group"
          >
            <div class="text-2xl font-bold text-gold-600">{{ vineyard.services.length }}</div>
            <div class="text-sm text-gray-600 group-hover:text-gold-700">Servicios</div>
            <div class="mt-1 text-xs transition-opacity opacity-0 text-gold-500 group-hover:opacity-100">
              Ver todos →
            </div>
          </button>
          <button 
            @click="activeTab = 'reviews'"
            class="p-4 text-center transition-colors rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 group"
          >
            <div class="text-2xl font-bold text-green-600">{{ vineyard.rating }}</div>
            <div class="text-sm text-gray-600 group-hover:text-green-700">Calificación</div>
            <div class="mt-1 text-xs text-green-500 transition-opacity opacity-0 group-hover:opacity-100">
              Ver reseñas →
            </div>
          </button>
          <button 
            @click="activeTab = 'reviews'"
            class="p-4 text-center transition-colors rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 group"
          >
            <div class="text-2xl font-bold text-blue-600">{{ vineyard.reviewCount }}</div>
            <div class="text-sm text-gray-600 group-hover:text-blue-700">Reseñas</div>
            <div class="mt-1 text-xs text-blue-500 transition-opacity opacity-0 group-hover:opacity-100">
              Leer todas →
            </div>
          </button>
        </div>
      </div>

      <!-- Resumen Rápido -->
      <div class="p-6 bg-white rounded-lg shadow-sm">
        <h3 class="mb-4 text-xl font-bold text-gray-900">Resumen Rápido</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-2 font-semibold text-gray-900">Productos Destacados</h4>
            <div class="space-y-2">
              <button
                v-for="product in vineyard.products.slice(0, 3)"
                :key="product.id"
                @click="openProductWithDelay(product)"
                class="flex items-center w-full p-2 space-x-3 text-left transition-colors rounded-lg hover:bg-gray-50"
              >
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="object-cover w-10 h-10 rounded"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ product.name }}</p>
                  <p class="text-xs text-gray-500">${{ product.price.toLocaleString() }}</p>
                </div>
              </button>
              <button
                v-if="vineyard.products.length > 3"
                @click="activeTab = 'products'"
                class="text-sm font-medium text-burgundy-600 hover:text-burgundy-700"
              >
                Ver todos los productos ({{ vineyard.products.length }})
              </button>
            </div>
          </div>
          
          <div>
            <h4 class="mb-2 font-semibold text-gray-900">Servicios Populares</h4>
            <div class="space-y-2">
              <button
                v-for="service in vineyard.services.slice(0, 3)"
                :key="service.id"
                @click="activeTab = 'services'"
                class="flex items-center justify-between w-full p-2 text-left transition-colors rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ service.name }}</p>
                  <p class="text-xs text-gray-500">
                    {{ service.price ? `$${service.price.toLocaleString()}` : 'Consultar precio' }}
                  </p>
                </div>
                <div class="text-xs text-gray-400">
                  {{ service.duration || 'Ver detalles' }}
                </div>
              </button>
              <button
                v-if="vineyard.services.length > 3"
                @click="activeTab = 'services'"
                class="text-sm font-medium text-burgundy-600 hover:text-burgundy-700"
              >
                Ver todos los servicios ({{ vineyard.services.length }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <div class="p-6 bg-white rounded-lg shadow-sm">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">Imagen Principal</h3>
        <img
          :src="vineyard.image"
          :alt="vineyard.name"
          class="object-cover w-full h-48 rounded-lg"
        />
      </div>
    </div>
  </div>
</template>



