"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userroutes_1 = __importDefault(require("./userroutes"));
const chatroutes_1 = __importDefault(require("./chatroutes"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use("/user", userroutes_1.default); //http://localhost:3000/api/v1/user
router.use("/chat", chatroutes_1.default); //http://localhost:3000/api/v1/chat
exports.default = router;
