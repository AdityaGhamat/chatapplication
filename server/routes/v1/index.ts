import userRoutes from "./userroutes";
import chatRoutes from "./chatroutes";
import express from "express";
const router = express.Router();
router.use("/user", userRoutes); //http://localhost:3000/api/v1/user
router.use("/chat", chatRoutes); //http://localhost:3000/api/v1/chat
export default router;
