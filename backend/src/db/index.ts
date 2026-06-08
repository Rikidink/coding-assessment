import { drizzle } from "drizzle-orm/better-sqlite3"

// create db instance with SQLite db file in root called local.db
export const db = drizzle("local.db")