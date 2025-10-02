<script setup lang="ts">
import { useServicesStore } from '~/store/services'
import ServiceCard from './components/ServiceCard.vue';

const route = useRoute()
const servicesStore = useServicesStore();
servicesStore.fetchServices()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ServiceCard 
          v-for="service in servicesStore?.services"
          :key="service.id"
          :service="service"
        />
      </div>
    </div>
  </div>
</template>

