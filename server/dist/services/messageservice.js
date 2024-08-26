"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChatMessage = sendChatMessage;
exports.getChatMessages = getChatMessages;
const messages_1 = require("../models/messages");
const db_1 = require("../drizzle/db");
const res_1 = require("../utils/res");
const http_status_codes_1 = require("http-status-codes");
const drizzle_orm_1 = require("drizzle-orm");
async function sendChatMessage(data) {
    try {
        const validatedData = messages_1.messagesInsertSchema.parse(data);
        const [newMessage] = await db_1.db
            .insert(messages_1.messages)
            .values(validatedData)
            .returning();
        return newMessage;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getChatMessages(chatId) {
    try {
        const chatMessages = await db_1.db
            .select()
            .from(messages_1.messages)
            .where((0, drizzle_orm_1.eq)(messages_1.messages.chatId, chatId));
        return chatMessages;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
