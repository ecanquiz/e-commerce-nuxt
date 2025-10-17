<script lang="ts" setup>
import Overview from './components/Overview.vue';

const route = useRoute()

const openProductModal = (product: Product) => {};
</script>
<template>
  <div>
    <Overview 
      :activeTab="'overview'"
      @openProductModal="openProductModal"
    />
  </div>
</template>