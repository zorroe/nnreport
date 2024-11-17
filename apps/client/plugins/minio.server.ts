import { setupMinioClient } from "~/utils/minio";

export default defineNuxtPlugin((nuxtApp) => {
  setupMinioClient();
});
