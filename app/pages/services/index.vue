<script setup lang="ts">
import { useServicesStore } from '~/store/services'
import ServiceCard from './components/ServiceCard.vue';

const route = useRoute()
const servicesStore = useServicesStore();
servicesStore.fetchServices()
</script>

<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2"> {{ servicesStore.services ? servicesStore.services : []}}
    <!--ServiceCard 
      v-for="service in servicesStore?.services"
      :key="service.id"
      :service="service"
    /-->
  </div>
</template>

