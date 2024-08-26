"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsSelectSchema = exports.requestsInsertSchema = exports.requests = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.requests = (0, pg_core_1.pgTable)("requests", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    status: (0, pg_core_1.varchar)("status", { length: 255 }).notNull().default("pending"),
    senderId: (0, pg_core_1.uuid)("senderId")
        .references(() => users_1.users.id)
        .notNull(),
    receiverId: (0, pg_core_1.uuid)("receiverId")
        .references(() => users_1.users.id)
        .notNull(),
});
exports.requestsInsertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.requests, {
    id: zod_1.z.string().uuid(),
    status: zod_1.z.string().max(255).default("pending"),
    senderId: zod_1.z.string().uuid(),
    receiverId: zod_1.z.string().uuid(),
});
exports.requestsSelectSchema = (0, drizzle_zod_1.createSelectSchema)(exports.requests, {
    id: zod_1.z.string().uuid(),
    status: zod_1.z.string(),
    senderId: zod_1.z.string().uuid(),
    receiverId: zod_1.z.string().uuid(),
});
