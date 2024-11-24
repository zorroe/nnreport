import { getMinioClient } from "~/utils/minio";

export default defineEventHandler(async (event) => {
  const client = getMinioClient();
  const params = getQuery(event);
  return await client.removeObject("nnreport", params.filename as string);
});
