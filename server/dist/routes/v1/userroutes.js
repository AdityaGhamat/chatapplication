"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
router.post("/", controllers_1.UserControllers.createUser);
router.post("/login", controllers_1.UserControllers.loginUser);
router.get("/", middlewares_1.verifytoken, controllers_1.UserControllers.getUser);
router.put("/", middlewares_1.verifytoken, controllers_1.UserControllers.updateUser);
router.delete("/", middlewares_1.verifytoken, controllers_1.UserControllers.deleteUser);
router.get("/logout", controllers_1.UserControllers.logoutUser);
exports.default = router;
