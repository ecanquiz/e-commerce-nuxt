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
  //image: {
    //domains: ['https://images.pexels.com'], // Add your image domains
    //provider: 'ipx' // o 'cloudinary' if you use another provider
  //},
  runtimeConfig: {
    public: {
      googleMapApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
      googleMapApiUrl: process.env.NUXT_PUBLIC_GOOGLE_MAP_API_URL || '', 
    }
  },
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
  plugins: [
    '~/plugins/auth-init.ts',
    '~/plugins/vineyards-init.ts'
  ],
  // middleware: [ 'auth.global', 'vineyards.global' ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'es', iso: 'es-ES', file: 'es.json' },
      { code: 'pt', iso: 'pt-PT', file: 'pt.json' }
    ],
    //lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',         // Default language (equivalent to fallbackLng)
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {     // Equivalent to your "LanguageDetector"
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'        // Detects language when entering root
    }
  }
})
