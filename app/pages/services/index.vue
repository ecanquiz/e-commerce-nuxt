<script setup lang="ts">
import { useServicesStore } from '~/store/services'
import ServiceCard from './components/ServiceCard.vue';

const route = useRoute()
const servicesStore = useServicesStore();
</script>

<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <!--ServiceCard 
      v-for="service in servicesStore?.services"
      :key="service.id"
      :service="service"
      :vineyard-name="vineyard?.name || ''"
    /-->
  </div>
</template>

