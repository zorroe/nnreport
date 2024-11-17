import * as Minio from "minio";

let minioClient: Minio.Client;

export function setupMinioClient() {
  if (minioClient) {
    return minioClient;
  }
  const config = useRuntimeConfig();

  minioClient = new Minio.Client({
    endPoint: config.minio.endpoint,
    port: parseInt(config.minio.port),
    useSSL: false,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey,
  });
}

export function getMinioClient() {
  if (!minioClient) {
    setupMinioClient();
  }
  return minioClient;
}
