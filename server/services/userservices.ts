import {
  LoginUserTypes,
  loginSchema,
  users,
  usersInsertSchema,
} from "../models/users";
import { chatMembers, chats, requests } from "../models";
import { requestsInsert, requestsInsertSchema } from "../models/requests";
import { UserTypes } from "../types";
import { db } from "../drizzle/db";
import { ApiError, ApiSuccess } from "../utils/res";
import { StatusCodes } from "http-status-codes";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ServerConfig } from "../config";

async function createUser(data: UserTypes) {
  try {
    const validatedInput = usersInsertSchema.parse(data);
    const [newUser] = await db.insert(users).values(validatedInput).returning();
    return newUser;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function loginUser(
  data: LoginUserTypes
): Promise<{ token: string } | ApiError> {
  try {
    const validatedInput = loginSchema.parse(data);
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, validatedInput.username))
      .limit(1);
    if (!user) {
      throw new ApiError("username is not correct", StatusCodes.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(
      validatedInput.password,
      user.password
    );
    if (!isMatch) {
      throw new ApiError("password is not correct", StatusCodes.BAD_REQUEST);
    }
    const token = jwt.sign(user.id, ServerConfig.JWT_SECRET);
    return { token };
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateUser(id: string, data: UserTypes) {
  try {
    const updatedInput = usersInsertSchema.partial().parse(data);
    const [updatedUser] = await db
      .update(users)
      .set(updatedInput)
      .where(eq(users.id, id))
      .returning();
    if (!updateUser) {
      throw new ApiError("Failed to update user", StatusCodes.BAD_REQUEST);
    }
    return updatedUser;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getUser(id: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    if (!user) {
      return new ApiError("User not found", StatusCodes.NOT_FOUND);
    }
    return user;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteUser(id: string) {
  try {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    if (deletedUser.length == 0) {
      return new ApiError("User not found", StatusCodes.NOT_FOUND);
    }
    return deleteUser;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function searchUser(query: string, userId: string) {
  try {
    const result = await db
      .select({
        username: users.username,
        userId: users.id,
        chatId: chatMembers.chatId,
      })
      .from(chatMembers)
      .innerJoin(chats, eq(chatMembers.chatId, chats.id))
      .innerJoin(users, eq(chatMembers.userId, users.id))
      .where(and(eq(chatMembers.userId, userId), eq(users.username, query)))
      .execute();
    return result;
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function sendFriendRequest(data: requestsInsert) {
  try {
    const validatedData = requestsInsertSchema.parse(data);
    const response = await db
      .insert(requests)
      .values(validatedData)
      .returning({ id: requests.id });
    if (response.length == 0) {
      throw new ApiError("Failed to create request", StatusCodes.BAD_REQUEST);
    }
    return response[0];
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function acceptFriendRequest(requestId: string, accept: boolean) {
  try {
  } catch (error: any) {
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  searchUser,
  sendFriendRequest,
};
