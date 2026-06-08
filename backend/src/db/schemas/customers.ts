import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const customersTable = sqliteTable("customers", {
  customerId: text().notNull().unique(),
  firstName: text().notNull(),
  lastName: text().notNull()
});