import { defineConfig } from "drizzle-kit";
import { ServerConfig } from "./config";
export default defineConfig({
  schema: "./server/models/*",
  out: "./server/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgres://${ServerConfig.POSTGRES_USER}:${ServerConfig.POSTGRES_PASSWORD}@localhost:5433/${ServerConfig.POSTGRES_DB}`,
  },
});
