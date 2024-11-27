import { getHttp } from "./http";

export const addRecordApi = (body: any) => {
  const http = getHttp();
  return http("/api/media-file/insert", {
    method: "post",
    body,
  });
};

export const listFileApi = (params?: any) => {
  const http = getHttp();
  return http("/api/media-file/list", {
    params,
  });
};

export const deleteFileApi = (filename: string) => {
  const http = getHttp();
  return http("/api/media-file/delete", {
    method: "delete",
    body: {
      filename,
    },
  });
};

export const queryTotal = (params: any) => {
  const http = getHttp();
  return http("/api/media-file/total", {
    params,
  });
};
