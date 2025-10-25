<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import AsideMovil from './AsideMovil.vue';
import Logo from '../../components/Logo.vue'

const isOpen = ref(false);

const close = () => { isOpen.value = false };
const toggle = () => { isOpen.value = !isOpen.value };

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close();
};

watch(isOpen, (val) => {
  // Prevent body scroll when drawer is open
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : '';
  }
});

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  if (import.meta.client) document.body.style.overflow = '';
});
</script>

<template>
  <div>
    <header class="bg-white border-b shadow-sm flex items-center justify-between px-4 py-3">
      <div class="flex items-center">
        <!-- Button to open the menu on mobile phones -->
        <button
          class="p-2 rounded-md hover:bg-burgundy-50 focus:outline-none focus:ring-2 focus:ring-burgundy-300 lg:hidden"
          aria-label="Abrir menú"
          @click="toggle"
        >
          <Icon name="lucide:menu" size="24" class="text-burgundy-700" />
        </button>

        <NuxtLink to="/merchant" class="ml-3 font-bold text-xl text-burgundy-800">
          <Logo />
        </NuxtLink>
      </div>

      <div class="flex items-center space-x-3">
        <button 
          class="p-2 rounded-md hover:bg-burgundy-50 transition-colors" 
          title="Ajustes"
        >
          <Icon name="lucide:settings" size="20" class="text-burgundy-700" />
        </button>
        <button 
          class="p-2 rounded-full bg-burgundy-100 hover:bg-burgundy-200 transition-colors" 
          title="Perfil"
        >
          <Icon name="lucide:user" size="20" class="text-burgundy-700" />
        </button>
      </div>
    </header>

    <!-- Mobile Drawer -->
    <transition name="slide-fade">
      <div v-if="isOpen" class="fixed inset-0 z-40 lg:hidden">
        <!-- overlay -->
        <div class="absolute inset-0 bg-black/40" aria-hidden="true" @click="close" />

        <!-- drawer -->
        <AsideMovil @close="close"/>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(-20px);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>