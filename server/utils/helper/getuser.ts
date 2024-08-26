import { db } from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { ApiError } from "../res";
import { StatusCodes } from "http-status-codes";
import { users } from "../../models";

async function getUser(id: string) {
  try {
    const user = await db.select().from(users).where(eq(users.id, id));
    return user;
  } catch (error: any) {
    throw new ApiError("Failed to get user", StatusCodes.BAD_REQUEST);
  }
}

export default getUser;
