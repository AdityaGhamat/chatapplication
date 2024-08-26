import { drizzle } from "drizzle-orm/postgres-js";
import { users, chatMembers, chats, messages, requests } from "../models";
import postgres from "postgres";
import { ServerConfig } from "../config";
const queryClient = postgres(
  `postgres://${ServerConfig.POSTGRES_USER}:${ServerConfig.POSTGRES_PASSWORD}@localhost:5433/${ServerConfig.POSTGRES_DB}`
);
export const db = drizzle(queryClient, {
  schema: { users, chatMembers, chats, messages, requests },
  logger: true,
});
