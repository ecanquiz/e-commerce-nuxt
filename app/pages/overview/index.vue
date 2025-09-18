<script lang="ts" setup>
import { useVineyardsStore } from '~/store/vineyards'
import Overview from './components/Overview.vue';

const storeVineyardsStore = useVineyardsStore();
const route = useRoute()

const vineyard = ref<Vineyard>();
vineyard.value = storeVineyardsStore.getVineyardById(route.params.id as string);
const openProductModal = (product: Product, vineyard: Vineyard) => {};
</script>
<template>
  <div>
    <Overview v-if = "vineyard"
      :vineyard="vineyard"
      :activeTab="'overview'"
      @openProductModal="openProductModal"
    />
  </div>
</template>