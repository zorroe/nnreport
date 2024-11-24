import { getMinioClient } from "~/utils/minio";

export default defineEventHandler(async (event) => {
  const client = getMinioClient();
  const params = getQuery(event);
  return (await client.presignedGetObject(
    "nnreport",
    params.filename as string,
    60 * 60 * 24,
  )) as string;
});
