<script lang="ts" setup>
  import Header from './components/Header.vue'
  import AsideDesktop from './components/AsideDesktop.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main class="flex-1 flex">
      <!-- For large screens -->
      <AsideDesktop />
      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
