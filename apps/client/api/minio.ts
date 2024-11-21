import { getHttp } from "./http";

export const minioUpload = (url: string, file: File) => {
  const http = getHttp();

  http(url, {
    method: "put",
    body: file,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
