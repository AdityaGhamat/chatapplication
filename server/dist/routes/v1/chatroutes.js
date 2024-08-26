"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
// Group chat routes
router.post("/group", middlewares_1.verifytoken, controllers_1.ChatControllers.createGroupChatController);
router.post("/group/add-users", middlewares_1.verifytoken, controllers_1.ChatControllers.addUsersToGroupChatController);
router.post("/group/message", middlewares_1.verifytoken, controllers_1.ChatControllers.sendGroupMessageController);
router.get("/group/messages", middlewares_1.verifytoken, controllers_1.ChatControllers.getGroupChatMessagesController);
router.get("/group/my-chats", middlewares_1.verifytoken, controllers_1.ChatControllers.getMyGroupChatsController);
router.delete("/group/remove-user", middlewares_1.verifytoken, controllers_1.ChatControllers.removeFromGroupChat);
router.delete("/group/leave-group", middlewares_1.verifytoken, controllers_1.ChatControllers.leaveGroupController);
// One-to-one chat routes
router.post("/one-to-one", middlewares_1.verifytoken, controllers_1.ChatControllers.createOneToOneChatController);
router.post("/one-to-one/add-member", middlewares_1.verifytoken, controllers_1.ChatControllers.addMemberOneToOneChatController);
router.delete("/one-to-one/remove-member", middlewares_1.verifytoken, controllers_1.ChatControllers.removeUserFromOneToOne);
router.post("/one-to-one/message", middlewares_1.verifytoken, controllers_1.ChatControllers.sendOneToOneMessageController);
router.get("/one-to-one/messages", middlewares_1.verifytoken, controllers_1.ChatControllers.getOneToOneChatMessagesController);
router.get("/one-to-one/my-chats", middlewares_1.verifytoken, controllers_1.ChatControllers.getMyOneToOneChatsController);
exports.default = router;
