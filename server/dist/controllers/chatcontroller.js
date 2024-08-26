"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroupChatController = createGroupChatController;
exports.addUsersToGroupChatController = addUsersToGroupChatController;
exports.removeFromGroupChat = removeFromGroupChat;
exports.leaveGroupController = leaveGroupController;
exports.sendGroupMessageController = sendGroupMessageController;
exports.getGroupChatMessagesController = getGroupChatMessagesController;
exports.getMyGroupChatsController = getMyGroupChatsController;
exports.createOneToOneChatController = createOneToOneChatController;
exports.sendOneToOneMessageController = sendOneToOneMessageController;
exports.getOneToOneChatMessagesController = getOneToOneChatMessagesController;
exports.getMyOneToOneChatsController = getMyOneToOneChatsController;
exports.addMemberOneToOneChatController = addMemberOneToOneChatController;
exports.removeUserFromOneToOne = removeUserFromOneToOne;
const services_1 = require("../services");
const res_1 = require("../utils/res");
const http_status_codes_1 = require("http-status-codes");
async function createGroupChatController(req, res) {
    try {
        const userId = req.id;
        const { name, avatar } = req.body;
        const response = await services_1.GroupChatServices.createGroupChat({
            name,
            groupChat: true,
            creatorId: userId,
            avatar,
        });
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.CREATED, "Group chat created successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function addUsersToGroupChatController(req, res) {
    try {
        const { chatId, userId } = req.body;
        const response = await services_1.GroupChatServices.addUsersToGroupChat(chatId, userId);
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.CREATED, "User added to group chat successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function removeFromGroupChat(req, res) {
    try {
        const userId = req.query.userId;
        const chatId = req.query.chatId;
        const response = await services_1.GroupChatServices.removeFromGroupChat(chatId, userId);
        if (!response) {
            const error = new res_1.ApiError("Failed to remove from gruop", http_status_codes_1.StatusCodes.BAD_REQUEST);
            return res.status(error.statusCode).json(error.toJSON());
        }
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.ACCEPTED, `Removed ${response.user.username} from group`, true);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function leaveGroupController(req, res) {
    try {
        const userId = req.query.userId;
        const chatId = req.query.chatId;
        const response = await services_1.GroupChatServices.leaveGroup(chatId, userId);
        if (response instanceof res_1.ApiError) {
            return res.status(response.statusCode).json(response.toJSON());
        }
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.ACCEPTED, `${response.user.name} leaved the gruop`, true);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function sendGroupMessageController(req, res) {
    try {
        const { content, attachmentPublicId, attachmentUrl, senderId, chatId, } = req.body;
        const response = await services_1.GroupChatServices.sendGroupMessage({
            content,
            attachmentPublicId,
            attachmentUrl,
            senderId,
            chatId,
        });
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.CREATED, "Message sent to group chat successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function getGroupChatMessagesController(req, res) {
    try {
        const { chatId } = req.params;
        const response = await services_1.GroupChatServices.getGroupChatMessages(chatId);
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.OK, "Group chat messages fetched successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function getMyGroupChatsController(req, res) {
    try {
        const userId = req.id;
        const response = await services_1.GroupChatServices.getMyGroupChats(userId);
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.OK, "Group chats fetched successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
// One-to-One Chat Controllers
async function createOneToOneChatController(req, res) {
    try {
        const userId = req.id;
        const { name, avatar } = req.body;
        const response = await services_1.OneToOneChatServices.createOneToOneChat({
            name,
            avatar,
            creatorId: userId,
        });
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.CREATED, "One-to-one chat created successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function addMemberOneToOneChatController(req, res) {
    try {
        const userId1 = req.id;
        const userId2 = req.query.id;
        const response = await services_1.OneToOneChatServices.addUsersToOneToOneChat(userId1, userId2);
        if (response instanceof res_1.ApiError) {
            return res.status(response.statusCode).json(response.toJSON());
        }
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.CREATED, "Added to chat", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function removeUserFromOneToOne(req, res) {
    try {
        const chatId = req.query.chatId;
        const userId = req.query.userId;
        const response = await services_1.OneToOneChatServices.removeOneToOneChat(chatId, userId);
        if (response instanceof res_1.ApiError) {
            return res.status(response.statusCode).json(response.toJSON());
        }
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.OK, `removed from the chat`, response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function sendOneToOneMessageController(req, res) {
    try {
        const { content, attachmentPublicId, attachmentUrl, senderId, chatId, } = req.body;
        const response = await services_1.OneToOneChatServices.sendOneToOneMessage({
            content,
            attachmentPublicId,
            attachmentUrl,
            senderId,
            chatId,
        });
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.CREATED, "Message sent to one-to-one chat successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function getOneToOneChatMessagesController(req, res) {
    try {
        const chatId = req.query.chatId;
        const response = await services_1.OneToOneChatServices.getOneToOneChatMessages(chatId);
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.OK, "One-to-one chat messages fetched successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function getMyOneToOneChatsController(req, res) {
    try {
        const userId = req.id;
        const response = await services_1.OneToOneChatServices.getMyOneToOneChats(userId);
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.OK, "One-to-one chats fetched successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
