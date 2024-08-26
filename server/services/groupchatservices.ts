import {
  chats,
  chatMembers,
  chatsInsertSchema,
  chatMembersInsertSchema,
} from "../models/chats";
import { messages, messagesInsertSchema } from "../models/messages";
import { db } from "../drizzle/db";
import { ApiError } from "../utils/res";
import { StatusCodes } from "http-status-codes";
import { ChatCreationTypes, MessageCreationTypes } from "../types";
import { eq, and } from "drizzle-orm";
import { users } from "../models";
import { handleFileUploads } from "../utils/helper";

async function createGroupChat(data: ChatCreationTypes) {
  try {
    const validatedData = chatsInsertSchema.parse(data);

    if (!validatedData.creatorId || !validatedData.groupChat) {
      throw new ApiError(
        "Group chat creation data is incomplete",
        StatusCodes.BAD_REQUEST
      );
    }

    const [newChat] = await db.insert(chats).values(validatedData).returning();
    return newChat;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function addUsersToGroupChat(chatId: string, userIds: string[]) {
  try {
    if (!chatId || userIds.length === 0) {
      throw new ApiError(
        "Chat ID and user IDs are required",
        StatusCodes.BAD_REQUEST
      );
    }
    const validatedDataArray = userIds.map((id) => {
      return chatMembersInsertSchema.parse({ chatId, userId: id });
    });
    const [chat] = await db
      .select()
      .from(chats)
      .where(eq(chats.id, chatId))
      .execute();
    if (!chat || !chat.groupChat) {
      throw new ApiError("Invalid group chat", StatusCodes.NOT_FOUND);
    }
    const newMembers = await db
      .insert(chatMembers)
      .values(validatedDataArray)
      .returning()
      .execute();

    return newMembers;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function removeFromGroupChat(chatId: string, userId: string) {
  try {
    const [chat] = await db
      .select()
      .from(chats)
      .where(eq(chats.id, chatId))
      .execute();
    if (!chat || !chat.groupChat) {
      throw new ApiError("Group not found", StatusCodes.NOT_FOUND);
    }
    const [result] = await db
      .delete(chatMembers)
      .where(
        and(eq(chatMembers.chatId, chatId), eq(chatMembers.userId, userId))
      )
      .returning();
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!result) {
      throw new ApiError(
        "Failed to remove user from group chat",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return { user, userId };
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function leaveGroup(chatId: string, userId: string) {
  try {
    const [chat] = await db
      .select()
      .from(chats)
      .where(eq(chats.id, chatId))
      .execute();
    if (!chat) {
      throw new ApiError("Group not found", StatusCodes.NOT_FOUND);
    }
    const [user] = await db.select().from(users).where(eq(users.id, userId));

    const [result] = await db
      .delete(chatMembers)
      .where(and(eq(users.id, userId), eq(chats.id, chatId)))
      .returning()
      .execute();
    if (!result) {
      throw new ApiError("Failed to leave group", StatusCodes.BAD_REQUEST);
    }
    return { result, user };
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function sendGroupMessage(
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

async function getGroupChatMessages(chatId: string) {
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

async function getMyGroupChats(id: string) {
  try {
    const chat = await db
      .select()
      .from(chats)
      .leftJoin(chatMembers, eq(chatMembers.chatId, chats.id))
      .where(and(eq(chats.id, id), eq(chats.groupChat, true)))
      .execute();
    return chat;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export {
  createGroupChat,
  addUsersToGroupChat,
  removeFromGroupChat,
  sendGroupMessage,
  getGroupChatMessages,
  getMyGroupChats,
  leaveGroup,
};
