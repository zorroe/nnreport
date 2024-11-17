import { getMinioClient } from "~/utils/minio";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const params = getQuery(event);
  const client = getMinioClient();

  client.putObject(
    params.bucket as string,
    "345.txt",
    body,
    body.length,
    (err: any, objInfo: any) => {
      console.log(objInfo);
    },
  );
});
