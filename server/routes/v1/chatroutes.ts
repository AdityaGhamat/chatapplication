import express from "express";
import { ChatControllers } from "../../controllers";
import { verifytoken } from "../../middlewares";
import { attachmentMulter } from "../../middlewares/multer";

const router = express.Router();

// Group chat routes
router.post("/group", verifytoken, ChatControllers.createGroupChatController);
router.post(
  "/group/add-users",
  verifytoken,
  ChatControllers.addUsersToGroupChatController
);
router.post(
  "/group/message",
  verifytoken,
  attachmentMulter,
  ChatControllers.sendGroupMessageController
);
router.get(
  "/group/messages",
  verifytoken,
  ChatControllers.getGroupChatMessagesController
);
router.get(
  "/group/my-chats",
  verifytoken,
  ChatControllers.getMyGroupChatsController
);
router.delete(
  "/group/remove-user",
  verifytoken,
  ChatControllers.removeFromGroupChat
);
router.delete(
  "/group/leave-group",
  verifytoken,
  ChatControllers.leaveGroupController
);

// One-to-one chat routes
router.post(
  "/one-to-one",
  verifytoken,
  ChatControllers.createOneToOneChatController
);
router.post(
  "/one-to-one/add-member",
  verifytoken,
  ChatControllers.addMemberOneToOneChatController
);
router.delete(
  "/one-to-one/remove-member",
  verifytoken,
  ChatControllers.removeUserFromOneToOne
);
router.post(
  "/one-to-one/message",
  verifytoken,
  attachmentMulter,
  ChatControllers.sendOneToOneMessageController
);
router.get(
  "/one-to-one/messages",
  verifytoken,
  ChatControllers.getOneToOneChatMessagesController
);
router.get(
  "/one-to-one/my-chats",
  verifytoken,
  ChatControllers.getMyOneToOneChatsController
);

export default router;
