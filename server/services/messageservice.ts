import { db } from "../drizzle/db";
import { ApiError } from "../utils/res";
import { StatusCodes } from "http-status-codes";
import { uploadOnCloudinary } from "../utils/helper";
import { messages, messagesInsertSchema } from "../models/messages";
import { MessageCreationTypes } from "../types";
import fs from "fs";
import { eq } from "drizzle-orm";

// Helper function to handle file uploads and cleanup
async function handleFileUploads(files: Express.Multer.File[]) {
  const uploadedFiles = [];
  for (const file of files) {
    const cloudinaryResponse = await uploadOnCloudinary(file.path);
    uploadedFiles.push({
      attachmentPublicId: cloudinaryResponse.public_id,
      attachmentUrl: cloudinaryResponse.url,
    });
    // Remove file from the local filesystem after upload
    fs.unlinkSync(file.path);
  }

  if (uploadedFiles.length === 0) {
    throw new ApiError("No files uploaded", StatusCodes.BAD_REQUEST);
  }

  // Return the first uploaded file's data (you can adjust if you want to handle multiple files)
  return uploadedFiles[0];
}

// One-to-One Message Service
async function sendOneToOneMessage(
  data: MessageCreationTypes,
  files?: Express.Multer.File[]
) {
  try {
    const validatedData = messagesInsertSchema.parse(data);

    let messageData = { ...validatedData };

    // If there are files to upload, handle file uploads and add attachment info
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

// Retrieve One-to-One Chat Messages
async function getOneToOneChatMessages(chatId: string) {
  try {
    const chatMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, chatId))
      .execute();

    return chatMessages;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// Group Message Service
async function sendGroupMessage(
  data: MessageCreationTypes,
  files?: Express.Multer.File[]
) {
  try {
    const validatedData = messagesInsertSchema.parse(data);

    let messageData = { ...validatedData };

    // If there are files to upload, handle file uploads and add attachment info
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

// Retrieve Group Chat Messages
async function getGroupChatMessages(chatId: string) {
  try {
    const chatMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, chatId))
      .execute();

    return chatMessages;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export {
  sendOneToOneMessage,
  getOneToOneChatMessages,
  sendGroupMessage,
  getGroupChatMessages,
};
