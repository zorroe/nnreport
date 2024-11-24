import { getHttp } from "./http";

export const minioUpload = (url: string, file: File) => {
  const http = getHttp();

  return new Promise((resolve, reject) => {
    http(url, {
      method: "put",
      body: file,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() =>
        resolve({
          code: 200,
          msg: "操作成功",
        }),
      )
      .catch(() =>
        resolve({
          code: 500,
          msg: "操作失败",
        }),
      );
  });
};

export const minioDownload = (url: string) => {
  const http = getHttp();
  return new Promise((resolve, reject) => {
    http(url, {
      method: "get",
      responseType: "blob",
    })
      .then((res) =>
        resolve({
          code: 200,
          msg: "操作成功",
          data: res,
        }),
      )
      .catch(() =>
        resolve({
          code: 500,
          msg: "操作失败",
        }),
      );
  });
};
