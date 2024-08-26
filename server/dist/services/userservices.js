"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
const users_1 = require("../models/users");
const db_1 = require("../drizzle/db");
const res_1 = require("../utils/res");
const http_status_codes_1 = require("http-status-codes");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
async function createUser(data) {
    try {
        const validatedInput = users_1.usersInsertSchema.parse(data);
        const [newUser] = await db_1.db.insert(users_1.users).values(validatedInput).returning();
        return newUser;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function loginUser(data) {
    try {
        const validatedInput = users_1.loginSchema.parse(data);
        const [user] = await db_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.username, validatedInput.username))
            .limit(1);
        if (!user) {
            throw new res_1.ApiError("username is not correct", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const isMatch = await bcrypt_1.default.compare(validatedInput.password, user.password);
        if (!isMatch) {
            throw new res_1.ApiError("password is not correct", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const token = jsonwebtoken_1.default.sign(user.id, config_1.ServerConfig.JWT_SECRET);
        return { token };
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateUser(id, data) {
    try {
        const updatedInput = users_1.usersInsertSchema.partial().parse(data);
        const [updatedUser] = await db_1.db
            .update(users_1.users)
            .set(updatedInput)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id))
            .returning();
        if (!updateUser) {
            throw new res_1.ApiError("Failed to update user", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        return updatedUser;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getUser(id) {
    try {
        const [user] = await db_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id))
            .limit(1);
        if (!user) {
            return new res_1.ApiError("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return user;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deleteUser(id) {
    try {
        const deletedUser = await db_1.db
            .delete(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id))
            .returning();
        if (deletedUser.length == 0) {
            return new res_1.ApiError("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return deleteUser;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
