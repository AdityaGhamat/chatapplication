"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatsRelations = exports.chatMembersRelations = exports.chatMembersSelectSchema = exports.chatMembersInsertSchema = exports.chatMembers = exports.chatsSelectSchema = exports.chatsInsertSchema = exports.chats = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.chats = (0, pg_core_1.pgTable)("chats", {
    id: (0, pg_core_2.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    groupChat: (0, pg_core_1.boolean)("groupChat").default(false),
    creatorId: (0, pg_core_2.uuid)("creatorId").references(() => users_1.users.id),
    avatar: (0, pg_core_1.varchar)("avatar", { length: 255 }).notNull(),
});
exports.chatsInsertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.chats, {
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().max(255),
    groupChat: zod_1.z.boolean(),
    creatorId: zod_1.z.string().uuid().max(255),
    avatar: zod_1.z.string().max(255),
});
exports.chatsSelectSchema = (0, drizzle_zod_1.createSelectSchema)(exports.chats, {
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    groupChat: zod_1.z.boolean(),
    creatorId: zod_1.z.string().uuid(),
    avatar: zod_1.z.string().optional(),
});
exports.chatMembers = (0, pg_core_1.pgTable)("chatMembers", {
    chatId: (0, pg_core_2.uuid)("chatId").references(() => exports.chats.id),
    userId: (0, pg_core_2.uuid)("userId").references(() => users_1.users.id),
}, (tables) => ({
    pk: (0, pg_core_3.primaryKey)({ columns: [tables.chatId, tables.userId] }),
    uniqueConstraint: {
        unique: [tables.chatId, tables.userId],
    },
}));
exports.chatMembersInsertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.chatMembers, {
    chatId: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
});
exports.chatMembersSelectSchema = (0, drizzle_zod_1.createSelectSchema)(exports.chatMembers, {
    chatId: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
});
exports.chatMembersRelations = (0, drizzle_orm_1.relations)(exports.chatMembers, ({ one }) => ({
    chats: one(exports.chats, { fields: [exports.chatMembers.chatId], references: [exports.chats.id] }),
    users: one(users_1.users, { fields: [exports.chatMembers.userId], references: [users_1.users.id] }),
}));
exports.chatsRelations = (0, drizzle_orm_1.relations)(exports.chats, ({ one }) => ({
    creator: one(users_1.users, { fields: [exports.chats.creatorId], references: [users_1.users.id] }),
}));
