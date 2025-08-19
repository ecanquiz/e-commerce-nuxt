<script setup lang="ts">
import { User as UserLucide } from 'lucide-vue-next'
import { useAuthStore } from '~/store/auth';
import type { User } from '~/types'
//import useClickOutside from '~/composables/useClickOutside'
import { useClickOutside } from './useClickOutside'  

const auth = useAuthStore()
const router = useRouter()
const isOpen = ref(false)

// Authenticated user access
const user = computed(() => auth.user!)

// Handlers
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleLogout = async () => {
  await auth.logout()
  router.push('/')
  closeDropdown()
}

// Closes the dropdown when clicking outside
const dropdownRef = ref<HTMLElement | null>(null)
useClickOutside(dropdownRef, closeDropdown)
</script>

<template>
  <div class="relative">
    <!-- Button that opens the dropdown -->
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 p-2 text-gray-700 hover:text-[color:var(--color-burgundy)] transition-colors"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <UserLucide class="h-5 w-5" />
      <span class="text-sm">{{ user.name }}</span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
    >
      <NuxtLink
        to="/profile"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        @click="closeDropdown"
      >
        {{ $t('navigation.profile') }}
      </NuxtLink>
      <NuxtLink
        to="/orders"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        @click="closeDropdown"
      >
        {{ $t('navigation.orders') }}
      </NuxtLink>

      <!-- Links by role -->
      <template v-if="user.role === 'vineyard'">
        <NuxtLink
          to="/dashboard/vineyard"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="closeDropdown"
        >
          Panel de Viñedo
        </NuxtLink>
      </template>

      <template v-if="user.role === 'admin'">
        <NuxtLink
          to="/dashboard/admin"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="closeDropdown"
        >
          Panel de Admin
        </NuxtLink>
      </template>

      <button
        @click="handleLogout"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        {{ $t('navigation.logout') }}
      </button>
    </div>
  </div>
</template>
