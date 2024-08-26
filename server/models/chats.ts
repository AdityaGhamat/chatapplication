import { pgTable, varchar, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";
import { uuid } from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const chats = pgTable("chats", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  groupChat: boolean("groupChat").default(false),
  creatorId: uuid("creatorId").references(() => users.id),
  avatar: varchar("avatar", { length: 255 }).notNull(),
});

export const chatsInsertSchema = createInsertSchema(chats, {
  id: z.string().uuid(),
  name: z.string().max(255),
  groupChat: z.boolean(),
  creatorId: z.string().uuid().max(255),
  avatar: z.string().max(255),
});

export type ChatCreationTypes = z.infer<typeof chatsInsertSchema>;

export const chatsSelectSchema = createSelectSchema(chats, {
  id: z.string().uuid(),
  name: z.string(),
  groupChat: z.boolean(),
  creatorId: z.string().uuid(),
  avatar: z.string().optional(),
});

export const chatMembers = pgTable(
  "chatMembers",
  {
    chatId: uuid("chatId").references(() => chats.id),
    userId: uuid("userId").references(() => users.id),
  },
  (tables) => ({
    pk: primaryKey({ columns: [tables.chatId, tables.userId] }),
    uniqueConstraint: {
      unique: [tables.chatId, tables.userId],
    },
  })
);

export const chatMembersInsertSchema = createInsertSchema(chatMembers, {
  chatId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type ChatAddMemberTypes = z.infer<typeof chatMembersInsertSchema>;

export const chatMembersSelectSchema = createSelectSchema(chatMembers, {
  chatId: z.string().uuid(),
  userId: z.string().uuid(),
});

export const chatMembersRelations = relations(chatMembers, ({ one }) => ({
  chats: one(chats, { fields: [chatMembers.chatId], references: [chats.id] }),
  users: one(users, { fields: [chatMembers.userId], references: [users.id] }),
}));

export const chatsRelations = relations(chats, ({ one }) => ({
  creator: one(users, { fields: [chats.creatorId], references: [users.id] }),
}));
