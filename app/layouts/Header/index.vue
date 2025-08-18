<script setup lang="ts">
import { ShoppingCart, Menu, X } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';
import Logo from './Logo.vue';
import DesktopNav from './DesktopNav.vue';
import LanguageSelector from './LanguageSelector.vue';

// Stores
const auth = useAuthStore();
const cart = useCartStore();

// Estado
const isMenuOpen = ref(false);
</script>

<template>
  <header class="bg-white shadow-lg relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top Bar -->
      <div class="flex justify-between items-center h-14">
        <Logo />

        <DesktopNav />

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          <NuxtLink to="/cart" class="relative p-2 text-gray-700 hover:text-[color:var(--color-burgundy)]">
            <ShoppingCart class="h-5 w-5" />
            <span v-if="cart.itemCount > 0" class="absolute -top-1 -right-1 bg-[color:var(--color-burgundy)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cart.itemCount }}
            </span>
          </NuxtLink>

          <!--UserDropdown v-if="auth.user" / TODO-->
          <!--AuthButtons v-else / TODO-->
        </div>

        <!-- Mobile Menu Button -->
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2 text-gray-700 hover:text-[color:var(--color-burgundy)]">
          <X v-if="isMenuOpen" class="h-6 w-6" />
          <Menu v-else class="h-6 w-6" />
        </button>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:block py-3 border-t border-gray-100">
        <!--SearchBar /TODO-->
      </div>

      <!-- Mobile Menu -->
      <!--MobileMenu v-if="isMenuOpen" @close="isMenuOpen = false" /TODO-->
    </div>
  </header>
</template>

