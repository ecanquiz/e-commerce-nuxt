<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="flex items-center space-x-2 p-2">
      <User class="h-5 w-5" />
      <span class="text-sm">{{ auth.user.name }}</span>
    </button>

    <div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      <NuxtLink to="/profile" class="block px-4 py-2 text-sm hover:bg-gray-100">
        {{ $t('navigation.profile') }}
      </NuxtLink>
      <button @click="auth.logout()" class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
        {{ $t('navigation.logout') }}
      </button>
    </div>
  </div>
</template>
