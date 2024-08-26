import { Request, Response } from "express";
import {
  ChatCreationTypes,
  ChatAddMembersTypes,
  MessageCreationTypes,
} from "../types";
import {
  GroupChatServices,
  OneToOneChatServices,
  MessageServices,
} from "../services";
import { ApiError, ApiSuccess } from "../utils/res";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "../types/utilitytypes";

async function createGroupChatController(req: CustomRequest, res: Response) {
  try {
    const userId = req.id as string;
    const { name, avatar }: ChatCreationTypes = req.body;
    const response = await GroupChatServices.createGroupChat({
      name,
      groupChat: true,
      creatorId: userId,
      avatar,
    });
    const success = new ApiSuccess(
      StatusCodes.CREATED,
      "Group chat created successfully",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function addUsersToGroupChatController(
  req: CustomRequest,
  res: Response
) {
  try {
    const { chatId, userId }: ChatAddMembersTypes = req.body;
    const response = await GroupChatServices.addUsersToGroupChat(
      chatId,
      userId
    );
    const success = new ApiSuccess(
      StatusCodes.CREATED,
      "User added to group chat successfully",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function removeFromGroupChat(req: CustomRequest, res: Response) {
  try {
    const userId = req.query.userId as string;
    const chatId = req.query.chatId as string;
    const response = await GroupChatServices.removeFromGroupChat(
      chatId,
      userId
    );
    if (!response) {
      const error = new ApiError(
        "Failed to remove from gruop",
        StatusCodes.BAD_REQUEST
      );
      return res.status(error.statusCode).json(error.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.ACCEPTED,
      `Removed ${response.user.username} from group`,
      true
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function leaveGroupController(req: CustomRequest, res: Response) {
  try {
    const userId = req.query.userId as string;
    const chatId = req.query.chatId as string;
    const response = await GroupChatServices.leaveGroup(chatId, userId);
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.ACCEPTED,
      `${response.user.name} leaved the gruop`,
      true
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function sendGroupMessageController(req: Request, res: Response) {
  const { files } = req;
  try {
    const response = await GroupChatServices.sendGroupMessage(
      req.body as MessageCreationTypes,
      files as Express.Multer.File[]
    );
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.OK,
      "Successfully sent the message",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function getGroupChatMessagesController(req: Request, res: Response) {
  try {
    const { chatId } = req.params;
    const response = await GroupChatServices.getGroupChatMessages(chatId);
    const success = new ApiSuccess(
      StatusCodes.OK,
      "Group chat messages fetched successfully",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function getMyGroupChatsController(req: CustomRequest, res: Response) {
  try {
    const userId = req.id as string;
    const response = await GroupChatServices.getMyGroupChats(userId);
    const success = new ApiSuccess(
      StatusCodes.OK,
      "Group chats fetched successfully",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

// One-to-One Chat Controllers
async function createOneToOneChatController(req: CustomRequest, res: Response) {
  try {
    const userId = req.id as string;
    const { name, avatar }: ChatCreationTypes = req.body;
    const response = await OneToOneChatServices.createOneToOneChat({
      name,
      avatar,
      creatorId: userId,
    });
    const success = new ApiSuccess(
      StatusCodes.CREATED,
      "One-to-one chat created successfully",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function addMemberOneToOneChatController(
  req: CustomRequest,
  res: Response
) {
  try {
    const userId1 = req.id as string;
    const userId2 = req.query.id as string;
    const response = await OneToOneChatServices.addUsersToOneToOneChat(
      userId1,
      userId2
    );
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.CREATED,
      "Added to chat",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function removeUserFromOneToOne(req: CustomRequest, res: Response) {
  try {
    const chatId = req.query.chatId as string;
    const userId = req.query.userId as string;
    const response = await OneToOneChatServices.removeOneToOneChat(
      chatId,
      userId
    );
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.OK,
      `removed from the chat`,
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function sendOneToOneMessageController(req: Request, res: Response) {
  const body = req.body as MessageCreationTypes;
  const files = req.files as Express.Multer.File[];
  try {
    const response = await OneToOneChatServices.sendOneToOneMessage(
      body,
      files
    );
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.ACCEPTED,
      "sent the message",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function getOneToOneChatMessagesController(req: Request, res: Response) {
  try {
    const chatId = req.query.chatId as string;
    const response = await OneToOneChatServices.getOneToOneChatMessages(chatId);
    const success = new ApiSuccess(
      StatusCodes.OK,
      "One-to-one chat messages fetched successfully",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function getMyOneToOneChatsController(req: CustomRequest, res: Response) {
  try {
    const userId = req.id as string;
    const response = await OneToOneChatServices.getMyOneToOneChats(userId);
    const success = new ApiSuccess(
      StatusCodes.OK,
      "One-to-one chats fetched successfully",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

export {
  createGroupChatController,
  addUsersToGroupChatController,
  removeFromGroupChat,
  leaveGroupController,
  sendGroupMessageController,
  getGroupChatMessagesController,
  getMyGroupChatsController,
  createOneToOneChatController,
  sendOneToOneMessageController,
  getOneToOneChatMessagesController,
  getMyOneToOneChatsController,
  addMemberOneToOneChatController,
  removeUserFromOneToOne,
};
