<script setup lang="ts">
import Product from '~/components/Product.vue';
import { useVineyardsStore } from '~/store/vineyards'

const route = useRoute();
const storeVineyardsStore = useVineyardsStore();

const { vineyard, product } = storeVineyardsStore.getVineyardAndProductByIds(
  route.params.vineyardId as string,
  route.params.productId as string
)
</script>

<template>
  <div>
   <Product
     v-if="vineyard && product"
     :vineyard="vineyard"
     :product="product"
     :isOpen="true"
     :onClose="() => {$router.go(-1)}"
    />
  </div>
</template>