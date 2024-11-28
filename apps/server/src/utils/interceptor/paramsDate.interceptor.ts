import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Observable } from "rxjs";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Shanghai");

@Injectable()
export class ParamsDateInterceptor implements NestInterceptor {
  private parseDate(key: string, value: any): Date | string {
    if (key === "startDate" && value) {
      return dayjs(value).startOf("day").toDate();
    }
    if (key === "endDate" && value) {
      return dayjs(value).endOf("day").toDate();
    }
    return value;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const query = context.switchToHttp().getRequest().query as any;
    const parsedQuery = Object.fromEntries(
      Object.entries(query).map(([key, value]) => [key, this.parseDate(key, value)]),
    );
    context.switchToHttp().getRequest().query = parsedQuery;
    return next.handle();
  }
}
