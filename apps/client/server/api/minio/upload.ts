import { getMinioClient } from "~/utils/minio";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = getMinioClient();
  const params = getQuery(event);

  client.putObject(
    process.env.MINIO_BUCKET!,
    params.filename as string,
    body,
    body.length,
    (err: any, objInfo: any) => {
      console.log(objInfo);
    },
  );
});
