import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./index.js";
import { customersTable } from "./schemas/customers.js";

migrate(db, { migrationsFolder: "./drizzle" });

// seed db with two customers
db.insert(customersTable).values([
  { customerId: "CUST-1", firstName: "Aaron", lastName: "Smith" },
  { customerId: "CUST-2", firstName: "Jessica", lastName: "White" },
]).run();

console.log("Seed complete.");
