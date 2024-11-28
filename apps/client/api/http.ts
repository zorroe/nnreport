import type { $Fetch } from "ofetch";

import { Message } from "@arco-design/web-vue";
import { useRuntimeConfig } from "#app";
import { saveAs } from "file-saver";
import { ofetch } from "ofetch";

// import { getToken } from "~/services/auth";

let http: $Fetch;
export function setupHttp() {
  if (http) return http;

  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase as string;

  http = ofetch.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    // async onRequest({ options }) {
    //   const token = await getToken();
    //   options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
    // },
    async onResponseError({ request, response, options }) {
      const { message } = response._data;
      if (Array.isArray(message)) {
        message.forEach((item) => {
          httpStatusErrorHandler?.(item, response.status);
        });
      } else {
        httpStatusErrorHandler?.(message, response.status);
      }
      return Promise.reject(response._data);
    },
    // retry: 3,
    // retryDelay: 1000,
  });
}

type HttpStatusErrorHandler = (message: string, statusCode: number) => void;
let httpStatusErrorHandler: HttpStatusErrorHandler;

export function injectHttpStatusErrorHandler(handler: HttpStatusErrorHandler) {
  httpStatusErrorHandler = handler;
}

// 通用下载方法
export async function download(url: string, filename: string) {
  const http = getHttp();
  http(url, {
    responseType: "blob",
  })
    .then((res) => {
      saveAs(res, filename);
    })
    .catch(() => {});
}

export function getHttp() {
  if (!http) {
    throw new Error("HTTP client not initialized. Call setupHttp first.");
  }
  return http;
}
