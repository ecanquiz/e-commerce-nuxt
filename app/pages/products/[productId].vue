<script setup lang="ts">
import Product from '~/components/Product.vue';
import { useProductsStore } from '~/store/products'

const route = useRoute();
const productsStore = useProductsStore();

const product = productsStore.getProductsById(
  route.params.productId as string
)
</script>

<template>
  <div>
   <Product
     v-if="product"
     :product="product"
     :isOpen="true"
     :onClose="() => {$router.go(-1)}"
    />
  </div>
</template>