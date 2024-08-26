import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  logoutUser,
} from "./usercontroller";
import {
  createGroupChatController,
  addUsersToGroupChatController,
  removeFromGroupChat,
  sendGroupMessageController,
  getGroupChatMessagesController,
  getMyGroupChatsController,
  createOneToOneChatController,
  sendOneToOneMessageController,
  getOneToOneChatMessagesController,
  getMyOneToOneChatsController,
  addMemberOneToOneChatController,
  removeUserFromOneToOne,
  leaveGroupController,
} from "./chatcontroller";

export const UserControllers = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  logoutUser,
};

export const ChatControllers = {
  createGroupChatController,
  addUsersToGroupChatController,
  removeFromGroupChat,
  sendGroupMessageController,
  getGroupChatMessagesController,
  getMyGroupChatsController,
  createOneToOneChatController,
  sendOneToOneMessageController,
  getOneToOneChatMessagesController,
  getMyOneToOneChatsController,
  addMemberOneToOneChatController,
  removeUserFromOneToOne,
  leaveGroupController,
};
