import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const requests = pgTable("requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  senderId: uuid("senderId")
    .references(() => users.id)
    .notNull(),
  receiverId: uuid("receiverId")
    .references(() => users.id)
    .notNull(),
});

export const requestsInsertSchema = createInsertSchema(requests, {
  id: z.string().uuid(),
  status: z.string().max(255).default("pending").optional(),
  senderId: z.string().uuid(),
  receiverId: z.string().uuid(),
});
export type requestsInsert = z.infer<typeof requestsInsertSchema>;

export const requestsSelectSchema = createSelectSchema(requests, {
  id: z.string().uuid(),
  status: z.string(),
  senderId: z.string().uuid(),
  receiverId: z.string().uuid(),
});
