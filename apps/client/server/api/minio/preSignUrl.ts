import { getMinioClient } from "~/utils/minio";

export default defineEventHandler(async () => {
  const client = getMinioClient();
  const res = await client.presignedPutObject("nnreport", "test.txt", 60 * 60 * 24);
  return res;
});
