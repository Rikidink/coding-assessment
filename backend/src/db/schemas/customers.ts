import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const customersTable = sqliteTable("customers", {
  customerId: text().notNull().primaryKey(),
  firstName: text().notNull(),
  lastName: text().notNull()
});