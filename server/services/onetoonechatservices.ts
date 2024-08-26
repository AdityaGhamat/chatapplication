import { chats, chatMembers, chatsInsertSchema } from "../models/chats";
import { messages, messagesInsertSchema } from "../models/messages";
import { db } from "../drizzle/db";
import { ApiError } from "../utils/res";
import { StatusCodes } from "http-status-codes";
import { ChatCreationTypes, MessageCreationTypes } from "../types";
import { users } from "../models";
import { eq, sql, and } from "drizzle-orm";
import { handleFileUploads } from "../utils/helper";

async function createOneToOneChat(data: ChatCreationTypes) {
  try {
    const validatedData = chatsInsertSchema.parse(data);

    if (!validatedData.creatorId || validatedData.groupChat) {
      throw new ApiError(
        "Invalid one-to-one chat creation data",
        StatusCodes.BAD_REQUEST
      );
    }
    const existingChat = await db
      .select()
      .from(chats)
      .leftJoin(chatMembers, eq(chatMembers.chatId, chats.id))
      .where(eq(chatMembers.userId, validatedData.creatorId))
      .groupBy(chats.id, chatMembers.chatId, chatMembers.userId)
      .having(sql`COUNT(DISTINCT ${chatMembers.userId}) = 2`)
      .execute();

    if (existingChat.length > 0) {
      return existingChat[0];
    }

    const [newChat] = await db.insert(chats).values(validatedData).returning();
    return newChat;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function removeOneToOneChat(chatId: string, userId: string) {
  try {
    const chat = await db
      .select()
      .from(chats)
      .where(eq(chats.id, chatId))
      .execute();
    if (chat.length == 0) {
      throw new ApiError("Group not found", StatusCodes.NOT_FOUND);
    }
    const user = await db.select().from(users).where(eq(users.id, userId));
    const [result] = await db
      .delete(chatMembers)
      .where(
        and(eq(chatMembers.chatId, chatId), eq(chatMembers.userId, userId))
      )
      .execute();
    if (result === 0) {
      throw new ApiError(
        "Failed to remove user from chat",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return { user };
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function addUsersToOneToOneChat(userId1: string, userId2: string) {
  try {
    const existingChat = await db
      .select()
      .from(chats)
      .leftJoin(chatMembers, eq(chats.id, chatMembers.chatId))
      .where(eq(chatMembers.userId, userId1))
      .groupBy(chats.id, chatMembers.chatId, chatMembers.userId)
      .having(sql`COUNT(DISTINCT ${chatMembers.userId}) = 2`)
      .execute();
    let chatId: string;
    if (existingChat.length > 0) {
      chatId = existingChat[0].chats.id;
    } else {
      const newChat = await db
        .insert(chats)
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
    await db.insert(chatMembers).values(membersToAdd).execute();
    return { chatId };
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function sendOneToOneMessage(
  data: MessageCreationTypes,
  files?: Express.Multer.File[]
) {
  try {
    const validatedData = messagesInsertSchema.parse(data);
    let messageData = { ...validatedData };
    if (files && files.length > 0) {
      const fileData = await handleFileUploads(files);
      messageData = {
        ...validatedData,
        attachmentPublicId: fileData.attachmentPublicId,
        attachmentUrl: fileData.attachmentUrl,
      };
    }

    const [newMessage] = await db
      .insert(messages)
      .values(messageData)
      .returning();

    return newMessage;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function getOneToOneChatMessages(chatId: string) {
  try {
    const chatMessages = await db
      .select({
        messageContent: messages.content,
        messageId: messages.id,
        attachmentUrl: messages.attachmentUrl,
        senderId: users.id,
        senderUsername: users.username,
      })
      .from(messages)
      .leftJoin(users, eq(messages.senderId, users.id))
      .where(eq(messages.chatId, chatId))
      .execute();

    return chatMessages;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getMyOneToOneChats(userId: string) {
  try {
    const newchats: any = await db
      .select()
      .from(chats)
      .leftJoin(chatMembers, eq(chatMembers.chatId, chats.id))
      .where(and(eq(chatMembers.userId, userId), eq(chats.groupChat, false)))
      .execute();
    return newchats;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
export {
  createOneToOneChat,
  sendOneToOneMessage,
  getOneToOneChatMessages,
  getMyOneToOneChats,
  addUsersToOneToOneChat,
  removeOneToOneChat,
};
