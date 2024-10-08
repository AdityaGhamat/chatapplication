"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentMulter = exports.singleAvatar = void 0;
const multer_1 = __importDefault(require("multer"));
const multerUpload = (0, multer_1.default)({
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
const singleAvatar = multerUpload.single("avatar");
exports.singleAvatar = singleAvatar;
const attachmentMulter = multerUpload.array("files", 5);
exports.attachmentMulter = attachmentMulter;
