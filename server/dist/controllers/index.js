"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatControllers = exports.UserControllers = void 0;
const usercontroller_1 = require("./usercontroller");
const chatcontroller_1 = require("./chatcontroller");
exports.UserControllers = {
    createUser: usercontroller_1.createUser,
    updateUser: usercontroller_1.updateUser,
    deleteUser: usercontroller_1.deleteUser,
    getUser: usercontroller_1.getUser,
    loginUser: usercontroller_1.loginUser,
    logoutUser: usercontroller_1.logoutUser,
};
exports.ChatControllers = {
    createGroupChatController: chatcontroller_1.createGroupChatController,
    addUsersToGroupChatController: chatcontroller_1.addUsersToGroupChatController,
    removeFromGroupChat: chatcontroller_1.removeFromGroupChat,
    sendGroupMessageController: chatcontroller_1.sendGroupMessageController,
    getGroupChatMessagesController: chatcontroller_1.getGroupChatMessagesController,
    getMyGroupChatsController: chatcontroller_1.getMyGroupChatsController,
    createOneToOneChatController: chatcontroller_1.createOneToOneChatController,
    sendOneToOneMessageController: chatcontroller_1.sendOneToOneMessageController,
    getOneToOneChatMessagesController: chatcontroller_1.getOneToOneChatMessagesController,
    getMyOneToOneChatsController: chatcontroller_1.getMyOneToOneChatsController,
    addMemberOneToOneChatController: chatcontroller_1.addMemberOneToOneChatController,
    removeUserFromOneToOne: chatcontroller_1.removeUserFromOneToOne,
    leaveGroupController: chatcontroller_1.leaveGroupController,
};
