// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@pinia/nuxt', 'nuxt-svgo'],
  css: ['assets/styles/global.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/main.scss" as *;'
        }
      }
    }
  },
  components: [
    {
      path: '~/components/ui',
      prefix: 'UI',
      extensions: ['.vue']
    },
    {
      path: '~/components/entities',
      prefix: 'Entity',
      extensions: ['.vue']
    },
    {
      path: '~/components/widgets',
      prefix: 'Widget',
      extensions: ['.vue']
    }
  ],
  svgo: {
    defaultImport: 'component'
  },
  imports: {
    dirs: ['utils/*/index.{ts,js,mjs,mts}']
  }
});
