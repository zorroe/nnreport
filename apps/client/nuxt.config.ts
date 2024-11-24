// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@nuxt/ui", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      apiBase: "http://127.0.0.1:4000",
    },
    minio: {
      endpoint: process.env.MINIO_ENDPOINT,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
      bucket: process.env.MINIO_BUCKET,
      port: process.env.MINIO_PORT,
    },
  },
});
