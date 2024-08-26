import { Request } from "express";
import { z } from "zod";
export interface CustomRequest extends Request {
  id?: string;
}
export type ChatAddMembersTypes = {
  chatId: string;
  userId: string[];
};

export const ChatAddMembersSchema = z.object({
  chatId: z.string().uuid(),
  userId: z.array(z.string().uuid()),
});

export type OneToOneChatType = z.infer<typeof ChatAddMembersSchema>;
