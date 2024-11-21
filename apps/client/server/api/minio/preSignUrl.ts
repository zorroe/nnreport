import { getMinioClient } from "~/utils/minio";

export default defineEventHandler(async (event) => {
  const client = getMinioClient();
  const params = getQuery(event);
  const res = await client.presignedPutObject("nnreport", params.filename as string, 60 * 60 * 24);
  return res;
});
