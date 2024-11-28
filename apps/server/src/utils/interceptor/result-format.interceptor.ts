import type { Response } from "express";

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { getReasonPhrase } from "http-status-codes";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { hasKeys } from "../tools";

@Injectable()
export class ResultFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = response.statusCode;
    const message = response.statusMessage || getReasonPhrase(code);

    return next.handle().pipe(
      map((data) => {
        if (data) {
          const hasFormat = hasKeys(data, ["code", "message", "data"]);
          if (hasFormat) return data;
        }
        return {
          code: code,
          message: message,
          data: data ?? null,
        };
      }),
    );
  }
}
