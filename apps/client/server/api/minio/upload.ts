import { getMinioClient } from "~/utils/minio";

export default defineEventHandler(async (event) => {
  const file = await readBody(event);
  const client = getMinioClient();
  const params = getQuery(event);

  client.putObject(process.env.MINIO_BUCKET!, params.filename as string, file);
});
