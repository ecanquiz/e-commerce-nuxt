<script setup lang="ts">
import { Globe, Check, ChevronDown } from 'lucide-vue-next';
import type { Language, LanguageCode } from '~/types'; // Tipado opcional

const { locale, setLocale, t } = useI18n();
const isOpen = ref(false);

const languages: Language[] = [
  { code: 'es', name: t('languages.spanish'), flag: '🇪🇸' },
  { code: 'en', name: t('languages.english'), flag: '🇺🇸' },
  { code: 'pt', name: t('languages.portuguese'), flag: '🇧🇷' }
];

const currentLanguage = computed(() => 
  languages.find(lang => lang.code === locale.value) || languages[0]
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = (languageCode: LanguageCode) => {
  setLocale(languageCode);
  isOpen.value = false;
  // Opcional: Guardar preferencia en cookies/localStorage
  useCookie('i18n_redirected').value = languageCode;
};
</script>

<template>
  <div class="relative">
    <!-- Botón principal -->
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-burgundy-600 transition-colors rounded-md hover:bg-gray-50"
    >
      <Globe class="h-4 w-4" />
      <span class="hidden sm:inline">{{ currentLanguage ? currentLanguage.flag : '' }}</span>
      <span class="hidden md:inline">{{ currentLanguage ? currentLanguage.name : '' }}</span>
      <ChevronDown :class="['h-4 w-4 transition-transform', { 'rotate-180': isOpen }]" />
    </button>

    <!-- Menú desplegable -->
    <div v-if="isOpen" class="fixed inset-0 z-10" @click="isOpen = false"></div>
    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200"
    >
      <button
        v-for="language in languages"
        :key="language.code"
        @click="changeLanguage(language.code)"
        class="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <div class="flex items-center space-x-3">
          <span class="text-lg">{{ language.flag }}</span>
          <span>{{ language.name }}</span>
        </div>
        <Check 
          v-if="currentLanguage && currentLanguage.code === language.code" 
          class="h-4 w-4 text-burgundy-600" 
        />
      </button>
    </div>
  </div>
</template>
