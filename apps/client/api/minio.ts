import { getHttp } from "./http";

export const minioUpload = (url: string, file: File | undefined) => {
  if (!file) {
    return Promise.resolve({
      code: 500,
      msg: "请选择文件",
    });
  }
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
