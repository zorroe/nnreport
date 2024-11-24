import { getHttp } from "./http";

export const addRecord = (filename: string, type: string) => {
  const http = getHttp();
  return http("/api/media-file/insert", {
    method: "post",
    body: {
      filename,
      type,
    },
  });
};
