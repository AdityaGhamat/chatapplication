"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChat = createChat;
exports.addUsersToChat = addUsersToChat;
exports.sendMessage = sendMessage;
exports.getChatMessages = getChatMessages;
exports.getMyChat = getMyChat;
exports.getOthersChat = getOthersChat;
const chats_1 = require("../models/chats");
const db_1 = require("../drizzle/db");
const res_1 = require("../utils/res");
const http_status_codes_1 = require("http-status-codes");
const messages_1 = require("../models/messages");
const drizzle_orm_1 = require("drizzle-orm");
async function createChat(data) {
    try {
        const validatedData = chats_1.chatsInsertSchema.parse(data);
        if (!validatedData.creatorId) {
            throw new res_1.ApiError("Creator ID is required", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        if (validatedData.groupChat) {
            const [newChat] = await db_1.db
                .insert(chats_1.chats)
                .values(validatedData)
                .returning();
            return newChat;
        }
        else {
            const existingChat = await db_1.db
                .select()
                .from(chats_1.chats)
                .leftJoin(chats_1.chatMembers, (0, drizzle_orm_1.eq)(chats_1.chatMembers.chatId, chats_1.chats.id))
                .where((0, drizzle_orm_1.eq)(chats_1.chatMembers.userId, validatedData.creatorId))
                .groupBy(chats_1.chats.id, chats_1.chatMembers.chatId, chats_1.chatMembers.userId)
                .having((0, drizzle_orm_1.sql) `COUNT(DISTINCT ${chats_1.chatMembers.userId}) = 2`)
                .execute();
            if (existingChat.length > 0) {
                return existingChat[0];
            }
            const [newChat] = await db_1.db
                .insert(chats_1.chats)
                .values(validatedData)
                .returning();
            return newChat;
        }
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function addUsersToChat(data) {
    try {
        const { chatId, userId } = data;
        const validatedDataArray = userId.map((userId) => {
            return chats_1.chatMembersInsertSchema.parse({ chatId, userId });
        });
        const [chat] = await db_1.db
            .select()
            .from(chats_1.chats)
            .where((0, drizzle_orm_1.eq)(chats_1.chats.id, chatId))
            .execute();
        if (!chat) {
            throw new res_1.ApiError("Chat not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        if (chat.groupChat) {
            const newMembers = await db_1.db
                .insert(chats_1.chatMembers)
                .values(validatedDataArray)
                .returning()
                .execute();
            return newMembers;
        }
        else {
            throw new res_1.ApiError("Cannot add members to a one-to-one chat", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getMyChat(id) {
    try {
        const chat = await db_1.db
            .select()
            .from(chats_1.chats)
            .leftJoin(chats_1.chatMembers, (0, drizzle_orm_1.eq)(chats_1.chatMembers.chatId, chats_1.chats.id))
            .where((0, drizzle_orm_1.eq)(chats_1.chats.id, id));
        return chat;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getOthersChat(id) {
    try {
        const chat = await db_1.db
            .select()
            .from(chats_1.chats)
            .leftJoin(chats_1.chatMembers, (0, drizzle_orm_1.eq)(chats_1.chats.id, chats_1.chatMembers.chatId))
            .where((0, drizzle_orm_1.ne)(chats_1.chatMembers.userId, id));
        return chat;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function sendMessage(data) {
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
