"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOneToOneChat = createOneToOneChat;
exports.sendOneToOneMessage = sendOneToOneMessage;
exports.getOneToOneChatMessages = getOneToOneChatMessages;
exports.getMyOneToOneChats = getMyOneToOneChats;
exports.addUsersToOneToOneChat = addUsersToOneToOneChat;
exports.removeOneToOneChat = removeOneToOneChat;
const chats_1 = require("../models/chats");
const messages_1 = require("../models/messages");
const db_1 = require("../drizzle/db");
const res_1 = require("../utils/res");
const http_status_codes_1 = require("http-status-codes");
const models_1 = require("../models");
const drizzle_orm_1 = require("drizzle-orm");
async function createOneToOneChat(data) {
    try {
        const validatedData = chats_1.chatsInsertSchema.parse(data);
        if (!validatedData.creatorId || validatedData.groupChat) {
            throw new res_1.ApiError("Invalid one-to-one chat creation data", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
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
        const [newChat] = await db_1.db.insert(chats_1.chats).values(validatedData).returning();
        return newChat;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function removeOneToOneChat(chatId, userId) {
    try {
        const chat = await db_1.db
            .select()
            .from(chats_1.chats)
            .where((0, drizzle_orm_1.eq)(chats_1.chats.id, chatId))
            .execute();
        if (chat.length == 0) {
            throw new res_1.ApiError("Group not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const user = await db_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.id, userId));
        const [result] = await db_1.db
            .delete(chats_1.chatMembers)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(chats_1.chatMembers.chatId, chatId), (0, drizzle_orm_1.eq)(chats_1.chatMembers.userId, userId)))
            .execute();
        if (result === 0) {
            throw new res_1.ApiError("Failed to remove user from chat", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return { user };
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function addUsersToOneToOneChat(userId1, userId2) {
    try {
        const existingChat = await db_1.db
            .select()
            .from(chats_1.chats)
            .leftJoin(chats_1.chatMembers, (0, drizzle_orm_1.eq)(chats_1.chats.id, chats_1.chatMembers.chatId))
            .where((0, drizzle_orm_1.eq)(chats_1.chatMembers.userId, userId1))
            .groupBy(chats_1.chats.id, chats_1.chatMembers.chatId, chats_1.chatMembers.userId)
            .having((0, drizzle_orm_1.sql) `COUNT(DISTINCT ${chats_1.chatMembers.userId}) = 2`)
            .execute();
        let chatId;
        if (existingChat.length > 0) {
            chatId = existingChat[0].chats.id;
        }
        else {
            const newChat = await db_1.db
                .insert(chats_1.chats)
                .values({
                name: `${userId2}`,
                creatorId: userId1,
                groupChat: false,
                avatar: "",
            })
                .returning()
                .execute();
            chatId = newChat[0].id;
        }
        const membersToAdd = [
            { chatId, userId: userId1 },
            { chatId, userId: userId2 },
        ];
        await db_1.db.insert(chats_1.chatMembers).values(membersToAdd).execute();
        return { chatId };
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function sendOneToOneMessage(data) {
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
async function getOneToOneChatMessages(chatId) {
    try {
        const chatMessages = await db_1.db
            .select()
            .from(messages_1.messages)
            .where((0, drizzle_orm_1.eq)(messages_1.messages.chatId, chatId))
            .execute();
        return chatMessages;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getMyOneToOneChats(userId) {
    try {
        const newchats = await db_1.db
            .select()
            .from(chats_1.chats)
            .leftJoin(chats_1.chatMembers, (0, drizzle_orm_1.eq)(chats_1.chatMembers.chatId, chats_1.chats.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(chats_1.chatMembers.userId, userId), (0, drizzle_orm_1.eq)(chats_1.chats.groupChat, false)))
            .execute();
        return newchats;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
