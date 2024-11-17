import { getMinioClient } from "~/utils/minio";

export default defineEventHandler(() => {
  const client = getMinioClient();
  return client.listBuckets();
});
