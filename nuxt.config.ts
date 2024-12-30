// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  build: {
    transpile: ["monaco-editor"],
  },

  site: {
    name: "WebDevDaily",
    url: "https://webdevdaily.io",
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    scanPageMeta: "after-resolve",
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false,
    },
  },

  devtools: { enabled: true },

  colorMode: {
    preference: "light",
  },

  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },

  modules: [
    "@nuxtjs/supabase",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-monaco-editor",
  ],

  googleFonts: {
    families: {
      Exo: [100, 200, 300, 400, 500, 600, 700, 800],
    },
  },

  monacoEditor: {
    globalAPI: true,
  },
});
