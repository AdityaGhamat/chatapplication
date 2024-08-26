import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  avatar: varchar("avatar", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
});

export const usersInsertSchema = createInsertSchema(users, {
  id: z.string().uuid().optional(),
  name: z.string().max(255),
  username: z.string().max(255),
  password: z.string().max(255),
  avatar: z.string().max(255),
  url: z.string().max(255),
});
export const loginSchema = z.object({
  username: z.string().max(255),
  password: z.string().max(255),
});
export const usersSelectSchema = createSelectSchema(users, {
  id: z.string().uuid(),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  avatar: z.string(),
  url: z.string(),
});

export type UserTypes = z.infer<typeof usersInsertSchema>;
export type LoginUserTypes = z.infer<typeof loginSchema>;
