import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { customersTable } from "./customers.js";

export const ordersTable = sqliteTable("orders", {
  orderId: text().notNull().primaryKey(),
  customerId: text().notNull()
    .references(() => customersTable.customerId),
  item: text().notNull(),
  quantity: integer().notNull()
});