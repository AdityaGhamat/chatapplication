"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAddMembersSchema = void 0;
const zod_1 = require("zod");
exports.ChatAddMembersSchema = zod_1.z.object({
    chatId: zod_1.z.string().uuid(),
    userId: zod_1.z.array(zod_1.z.string().uuid()),
});
