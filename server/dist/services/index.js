"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneToOneChatServices = exports.GroupChatServices = exports.UserServices = void 0;
const userservices_1 = require("./userservices");
const groupchatservices_1 = require("./groupchatservices");
const onetoonechatservices_1 = require("./onetoonechatservices");
exports.UserServices = {
    createUser: userservices_1.createUser,
    updateUser: userservices_1.updateUser,
    deleteUser: userservices_1.deleteUser,
    getUser: userservices_1.getUser,
    loginUser: userservices_1.loginUser,
};
exports.GroupChatServices = {
    createGroupChat: groupchatservices_1.createGroupChat,
    addUsersToGroupChat: groupchatservices_1.addUsersToGroupChat,
    sendGroupMessage: groupchatservices_1.sendGroupMessage,
    getGroupChatMessages: groupchatservices_1.getGroupChatMessages,
    getMyGroupChats: groupchatservices_1.getMyGroupChats,
    removeFromGroupChat: groupchatservices_1.removeFromGroupChat,
    leaveGroup: groupchatservices_1.leaveGroup,
};
exports.OneToOneChatServices = {
    createOneToOneChat: onetoonechatservices_1.createOneToOneChat,
    sendOneToOneMessage: onetoonechatservices_1.sendOneToOneMessage,
    getOneToOneChatMessages: onetoonechatservices_1.getOneToOneChatMessages,
    getMyOneToOneChats: onetoonechatservices_1.getMyOneToOneChats,
    addUsersToOneToOneChat: onetoonechatservices_1.addUsersToOneToOneChat,
    removeOneToOneChat: onetoonechatservices_1.removeOneToOneChat,
};
