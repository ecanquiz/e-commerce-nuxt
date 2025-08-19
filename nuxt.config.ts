import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',

  ],
  pages: {
    pattern: ['**/*.vue', '!**/components/**']
  },
  components: [
    '~/components/', {
      path: '~/layouts',
      pattern: '**/components/**',
      pathPrefix: false
    }, {
      path: '~/pages',
      pattern: '**/components/**',
      pathPrefix: false
    }
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'es', iso: 'es-ES', file: 'es.json' },
      { code: 'pt', iso: 'pt-PT', file: 'pt.json' }
    ],
    //lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',         // Idioma por defecto (equivalente a fallbackLng)
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {     // Equivalente a tu "LanguageDetector"
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'        // Detecta el idioma al entrar en la raíz
    }
  }
})
