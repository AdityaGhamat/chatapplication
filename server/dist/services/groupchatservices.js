"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroupChat = createGroupChat;
exports.addUsersToGroupChat = addUsersToGroupChat;
exports.removeFromGroupChat = removeFromGroupChat;
exports.sendGroupMessage = sendGroupMessage;
exports.getGroupChatMessages = getGroupChatMessages;
exports.getMyGroupChats = getMyGroupChats;
exports.leaveGroup = leaveGroup;
const chats_1 = require("../models/chats");
const messages_1 = require("../models/messages");
const db_1 = require("../drizzle/db");
const res_1 = require("../utils/res");
const http_status_codes_1 = require("http-status-codes");
const drizzle_orm_1 = require("drizzle-orm");
const models_1 = require("../models");
async function createGroupChat(data) {
    try {
        const validatedData = chats_1.chatsInsertSchema.parse(data);
        if (!validatedData.creatorId || !validatedData.groupChat) {
            throw new res_1.ApiError("Group chat creation data is incomplete", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const [newChat] = await db_1.db.insert(chats_1.chats).values(validatedData).returning();
        return newChat;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function addUsersToGroupChat(chatId, userIds) {
    try {
        if (!chatId || userIds.length === 0) {
            throw new res_1.ApiError("Chat ID and user IDs are required", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const validatedDataArray = userIds.map((id) => {
            return chats_1.chatMembersInsertSchema.parse({ chatId, userId: id });
        });
        const [chat] = await db_1.db
            .select()
            .from(chats_1.chats)
            .where((0, drizzle_orm_1.eq)(chats_1.chats.id, chatId))
            .execute();
        if (!chat || !chat.groupChat) {
            throw new res_1.ApiError("Invalid group chat", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const newMembers = await db_1.db
            .insert(chats_1.chatMembers)
            .values(validatedDataArray)
            .returning()
            .execute();
        return newMembers;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function removeFromGroupChat(chatId, userId) {
    try {
        const [chat] = await db_1.db
            .select()
            .from(chats_1.chats)
            .where((0, drizzle_orm_1.eq)(chats_1.chats.id, chatId))
            .execute();
        if (!chat || !chat.groupChat) {
            throw new res_1.ApiError("Group not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const [result] = await db_1.db
            .delete(chats_1.chatMembers)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(chats_1.chatMembers.chatId, chatId), (0, drizzle_orm_1.eq)(chats_1.chatMembers.userId, userId)))
            .returning();
        const [user] = await db_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.id, userId));
        if (!result) {
            throw new res_1.ApiError("Failed to remove user from group chat", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return { user, userId };
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function leaveGroup(chatId, userId) {
    try {
        const [chat] = await db_1.db
            .select()
            .from(chats_1.chats)
            .where((0, drizzle_orm_1.eq)(chats_1.chats.id, chatId))
            .execute();
        if (!chat) {
            throw new res_1.ApiError("Group not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const [user] = await db_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.id, userId));
        const [result] = await db_1.db
            .delete(chats_1.chatMembers)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models_1.users.id, userId), (0, drizzle_orm_1.eq)(chats_1.chats.id, chatId)))
            .returning()
            .execute();
        if (!result) {
            throw new res_1.ApiError("Failed to leave group", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        return { result, user };
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function sendGroupMessage(data) {
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
async function getGroupChatMessages(chatId) {
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
async function getMyGroupChats(id) {
    try {
        const chat = await db_1.db
            .select()
            .from(chats_1.chats)
            .leftJoin(chats_1.chatMembers, (0, drizzle_orm_1.eq)(chats_1.chatMembers.chatId, chats_1.chats.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(chats_1.chats.id, id), (0, drizzle_orm_1.eq)(chats_1.chats.groupChat, true)))
            .execute();
        return chat;
    }
    catch (error) {
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
