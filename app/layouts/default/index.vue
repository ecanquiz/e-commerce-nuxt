<script setup lang="ts">
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

</script>
<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

