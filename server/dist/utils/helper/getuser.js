"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../drizzle/db");
const drizzle_orm_1 = require("drizzle-orm");
const res_1 = require("../res");
const http_status_codes_1 = require("http-status-codes");
const models_1 = require("../../models");
async function getUser(id) {
    try {
        const user = await db_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.id, id));
        return user;
    }
    catch (error) {
        throw new res_1.ApiError("Failed to get user", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.default = getUser;
