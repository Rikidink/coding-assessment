import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas/*',
  dialect: 'sqlite',
  dbCredentials: {
    url: './local.db'
  }
});