"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRelations = exports.messagesSelectSchema = exports.messagesInsertSchema = exports.messages = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const chats_1 = require("./chats");
const users_1 = require("./users");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.messages = (0, pg_core_1.pgTable)("messages", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    content: (0, pg_core_1.varchar)("content", { length: 5000 }),
    attachmentPublicId: (0, pg_core_1.varchar)("attachmentPublicId", { length: 255 }).notNull(),
    attachmentUrl: (0, pg_core_1.varchar)("attachmentUrl", { length: 255 }).notNull(),
    senderId: (0, pg_core_1.uuid)("senderId")
        .references(() => users_1.users.id)
        .notNull(),
    chatId: (0, pg_core_1.uuid)("chatId")
        .references(() => chats_1.chats.id)
        .notNull(),
});
exports.messagesInsertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.messages, {
    id: zod_1.z.string().uuid(),
    content: zod_1.z.string().max(5000).optional(),
    attachmentPublicId: zod_1.z.string().max(255),
    attachmentUrl: zod_1.z.string().max(255),
    senderId: zod_1.z.string().uuid(),
    chatId: zod_1.z.string().uuid(),
});
exports.messagesSelectSchema = (0, drizzle_zod_1.createSelectSchema)(exports.messages, {
    id: zod_1.z.string().uuid(),
    content: zod_1.z.string().optional(),
    attachmentPublicId: zod_1.z.string(),
    attachmentUrl: zod_1.z.string(),
    senderId: zod_1.z.string().uuid(),
    chatId: zod_1.z.string().uuid(),
});
exports.messagesRelations = (0, drizzle_orm_1.relations)(exports.messages, ({ one }) => ({
    chat: one(chats_1.chats, { fields: [exports.messages.chatId], references: [chats_1.chats.id] }),
    sender: one(users_1.users, { fields: [exports.messages.senderId], references: [users_1.users.id] }),
}));
