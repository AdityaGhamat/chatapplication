import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  searchUser,
  sendFriendRequest,
} from "./userservices";

import {
  createGroupChat,
  addUsersToGroupChat,
  getMyGroupChats,
  removeFromGroupChat,
  leaveGroup,
} from "./groupchatservices";

import {
  createOneToOneChat,
  getMyOneToOneChats,
  addUsersToOneToOneChat,
  removeOneToOneChat,
} from "./onetoonechatservices";

import {
  sendOneToOneMessage,
  getOneToOneChatMessages,
  sendGroupMessage,
  getGroupChatMessages,
} from "./messageservice";

export const UserServices = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  searchUser,
  sendFriendRequest,
};

export const GroupChatServices = {
  createGroupChat,
  addUsersToGroupChat,
  sendGroupMessage,
  getGroupChatMessages,
  getMyGroupChats,
  removeFromGroupChat,
  leaveGroup,
};

export const OneToOneChatServices = {
  createOneToOneChat,
  sendOneToOneMessage,
  getOneToOneChatMessages,
  getMyOneToOneChats,
  addUsersToOneToOneChat,
  removeOneToOneChat,
};

export const MessageServices = {
  sendOneToOneMessage,
  getOneToOneChatMessages,
  sendGroupMessage,
  getGroupChatMessages,
};
