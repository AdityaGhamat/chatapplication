"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSelectSchema = exports.loginSchema = exports.usersInsertSchema = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    username: (0, pg_core_1.varchar)("username", { length: 255 }).notNull().unique(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    avatar: (0, pg_core_1.varchar)("avatar", { length: 255 }).notNull(),
    url: (0, pg_core_1.varchar)("url", { length: 255 }).notNull(),
});
exports.usersInsertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users, {
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string().max(255),
    username: zod_1.z.string().max(255),
    password: zod_1.z.string().max(255),
    avatar: zod_1.z.string().max(255),
    url: zod_1.z.string().max(255),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().max(255),
    password: zod_1.z.string().max(255),
});
exports.usersSelectSchema = (0, drizzle_zod_1.createSelectSchema)(exports.users, {
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    avatar: zod_1.z.string(),
    url: zod_1.z.string(),
});
