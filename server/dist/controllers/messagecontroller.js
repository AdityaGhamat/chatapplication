"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageController = sendMessageController;
exports.getChatMessagesController = getChatMessagesController;
const res_1 = require("../utils/res");
const http_status_codes_1 = require("http-status-codes");
// Controller to send a message
async function sendMessageController(req, res) {
    try {
        const { content, attachmentPublicId, attachmentUrl, senderId, chatId, } = req.body;
        const response = await sendMessage({
            content,
            attachmentPublicId,
            attachmentUrl,
            senderId,
            chatId,
        });
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.CREATED, "Message sent successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
// Controller to get messages for a chat
async function getChatMessagesController(req, res) {
    try {
        const { chatId } = req.params;
        const response = await getChatMessages(chatId);
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.OK, "Messages fetched successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
