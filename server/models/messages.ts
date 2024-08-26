import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { chats } from "./chats";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: varchar("content", { length: 5000 }),
  attachmentPublicId: varchar("attachmentPublicId", { length: 255 }).notNull(),
  attachmentUrl: varchar("attachmentUrl", { length: 255 }).notNull(),
  senderId: uuid("senderId")
    .references(() => users.id)
    .notNull(),
  chatId: uuid("chatId")
    .references(() => chats.id)
    .notNull(),
});

export const messagesInsertSchema = createInsertSchema(messages, {
  id: z.string().uuid(),
  content: z.string().max(5000).optional(),
  attachmentPublicId: z.string().max(255),
  attachmentUrl: z.string().max(255),
  senderId: z.string().uuid(),
  chatId: z.string().uuid(),
});
export type MessageCreationTypes = z.infer<typeof messagesInsertSchema>;
export const messagesSelectSchema = createSelectSchema(messages, {
  id: z.string().uuid(),
  content: z.string().optional(),
  attachmentPublicId: z.string(),
  attachmentUrl: z.string(),
  senderId: z.string().uuid(),
  chatId: z.string().uuid(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, { fields: [messages.chatId], references: [chats.id] }),
  sender: one(users, { fields: [messages.senderId], references: [users.id] }),
}));
