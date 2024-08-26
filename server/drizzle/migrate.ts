import { ServerConfig } from "../config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(
  `postgres://${ServerConfig.POSTGRES_USER}:${ServerConfig.POSTGRES_PASSWORD}@localhost:5433/${ServerConfig.POSTGRES_DB}`,
  { max: 1 }
);

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./server/drizzle",
  });

  await migrationClient.end();
}
main();
