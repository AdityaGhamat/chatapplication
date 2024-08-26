import express from "express";
import { UserControllers } from "../../controllers";
import { verifytoken } from "../../middlewares";

const router = express.Router();
router.post("/", UserControllers.createUser);
router.post("/login", UserControllers.loginUser);
router.get("/", verifytoken, UserControllers.getUser);
router.put("/", verifytoken, UserControllers.updateUser);
router.delete("/", verifytoken, UserControllers.deleteUser);
router.get("/logout", UserControllers.logoutUser);

export default router;
