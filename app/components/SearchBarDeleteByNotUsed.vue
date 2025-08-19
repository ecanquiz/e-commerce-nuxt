<template>
  <div class="relative max-w-4xl mx-auto">
    <form @submit.prevent="handleSearch" class="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md">
      <!-- Selector de categoría -->
      <select 
        v-model="searchCategory"
        class="appearance-none bg-gray-50 border-r border-gray-300 px-4 py-3 pr-8 text-sm text-gray-700 focus:outline-none focus:bg-white rounded-l-lg"
      >
        <option v-for="cat in searchCategories" :value="cat.value">
          {{ $t(cat.label) }}
        </option>
      </select>

      <!-- Input -->
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('common.search') + ' vinos...'"
        class="w-full px-4 py-3 text-gray-700 focus:outline-none"
      />

      <!-- Botón -->
      <button type="submit" class="bg-burgundy-600 hover:bg-burgundy-700 text-white px-6 py-3 rounded-r-lg">
        <Search class="h-5 w-5" />
      </button>
    </form>

    <!-- Resultados -->
    <SearchResults v-if="showResults" />
  </div>
</template>