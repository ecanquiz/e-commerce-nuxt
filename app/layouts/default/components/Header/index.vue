<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ShoppingCart } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';

//import Logo from './Logo.vue';
//import DesktopNav from './DesktopNav.vue';
//import LanguageSelector from './LanguageSelector.vue';
//import SearchBar from './SearchBar.vue';
//import UserDropdown from './UserDropdown.vue';
//import AuthButtons from './AuthButtons.vue';
//import MobileMenu from './MobileMenu.vue';

const { t } = useI18n()
const route = useRoute();

// Stores
const auth = useAuthStore();
const cart = useCartStore();

// Load cart when logging in
watch(() => auth.isAuthenticated, (isAuth) => {
  if (!isAuth) cart.loadCart()
}, { immediate: true })

// Estado
//const isMenuOpen = ref(false);
const isMobileMenuOpen = ref(false)

// Elimina isMenuOpen (no es necesario duplicar el estado)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

interface NavItem {
  name: string
  href: string
  //icon?: string
  //exact?: boolean
}

// Navigation items con i18n
const navigationItems = computed<NavItem[]>(() => [
  { 
    name: t('navigation.home'), 
    href: '/',
    //icon: 'lucide:home'
  },
  { 
    name: t('navigation.vineyards'), 
    href: '/vineyards',
    //icon: 'lucide:grape'
  },
  { 
    name: t('navigation.products'), 
    href: '/products',
    //icon: 'lucide:wine'
  },
  { 
    name: t('navigation.about'), 
    href: '/about',
    //icon: 'lucide:info'
  },
  { 
    name: t('navigation.contact'), 
    href: '/contact',
    //icon: 'lucide:mail'
  }
])

// Cierra el menú cuando la ruta cambia
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
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
          <NuxtLink to="/cart" class="relative p-2 text-gray-700 hover:text-color-burgundy-600">
            <ShoppingCart class="h-5 w-5" />
            <span v-if="cart.itemCount > 0" class="absolute -top-1 -right-1 bg-burgundy-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cart.itemCount }}
            </span>
          </NuxtLink>

          {{ auth.user ? auth.user.name : $t('common.guest') }}

            <UserDropdown v-if="auth.user"/>
            <AuthButtons v-else/>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-gray-700 hover:text-burgundy-600"
          aria-label="Toggle mobile menu"
        >
          <Icon :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="h-6 w-6" />
        </button>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:block">
        <SearchBar />
      </div>

      <!-- Mobile Menu -->
      <MobileMenu
        v-model="isMobileMenuOpen"
        :navigation="navigationItems"
      />
      
    </div>
  </header>
</template>

