import { FactoryProvider } from "@nestjs/common";
import { SchemaType } from "@nnreport/schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { setupDB } from "../../common/db";

export type DbType = PostgresJsDatabase<SchemaType>;

export const DB = Symbol("DB_SERVICE");

export const DbProvider: FactoryProvider<DbType> = {
  provide: DB,
  useFactory: async () => {
    return await setupDB();
  },
};
