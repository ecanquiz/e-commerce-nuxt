<script setup lang="ts">
import { Search, Filter, MapPin } from 'lucide-vue-next';
import { useVineyardsStore } from '~/store/vineyards';
import type { Vineyard } from '~~/shared/types';

const vineyardsStore = useVineyardsStore()

vineyardsStore.fetchVineyards();
const mockVineyards: Vineyard[] = vineyardsStore.vineyards

const searchTerm = ref('');
const selectedRegion = ref('');
const sortBy = ref('rating');

const regions = ['Mendoza', 'San Juan', 'Salta', 'Río Negro', 'La Rioja'];

const filteredVineyards = computed(() => {
  let filtered = mockVineyards
    .filter(vineyard => 
      vineyard.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      vineyard.location.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
    .filter(vineyard => 
      selectedRegion.value === '' || vineyard.location.includes(selectedRegion.value)
    );

  // Ordenar
  return filtered.sort((a, b) => {
    if (sortBy.value === 'rating') return b.rating - a.rating;
    if (sortBy.value === 'name') return a.name.localeCompare(b.name);
    if (sortBy.value === 'established') return b.established - a.established;
    return 0;
  });
});

const setSearchTerm = (value: string) => {
  searchTerm.value = value;
};

const setSelectedRegion = (value: string) => {
  selectedRegion.value = value;
};

const setSortBy = (value: string) => {
  sortBy.value = value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Viñedos de Argentina
        </h1>
        <p class="text-xl text-gray-600">
          Descubre los mejores viñedos del país
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="relative">
            <Search class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar viñedos..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
              :value="searchTerm"
              @input="setSearchTerm(($event.target as HTMLInputElement).value)"
            />
          </div>
          
          <div class="relative">
            <MapPin class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent appearance-none"
              :value="selectedRegion"
              @change="setSelectedRegion(($event.target as HTMLSelectElement).value)"
            >
              <option value="">Todas las regiones</option>
              <option
                v-for="region in regions"
                :key="region"
                :value="region"
              >
                {{ region }}
              </option>
            </select>
          </div>
          
          <div class="relative">
            <Filter class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent appearance-none"
              :value="sortBy"
              @change="setSortBy(($event.target as HTMLSelectElement).value)"
            >
              <option value="rating">Mejor calificación</option>
              <option value="name">Nombre A-Z</option>
              <option value="established">Más antiguo</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="flex items-center justify-between mb-6">
        <p class="text-gray-600">
          {{ filteredVineyards.length }} viñedos encontrados
        </p>
      </div>

      <!-- Vineyards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <VineyardCard
          v-for="vineyard in filteredVineyards"
          :key="vineyard.id"
          :vineyard="vineyard"
        />
      </div>

      <div v-if="filteredVineyards.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <Search class="h-16 w-16 mx-auto" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          No se encontraron viñedos
        </h3>
        <p class="text-gray-600">
          Intenta ajustar los filtros de búsqueda
        </p>
      </div>
    </div>
  </div>
</template>
