"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const models_1 = require("../models");
const postgres_1 = __importDefault(require("postgres"));
const config_1 = require("../config");
const queryClient = (0, postgres_1.default)(`postgres://${config_1.ServerConfig.POSTGRES_USER}:${config_1.ServerConfig.POSTGRES_PASSWORD}@localhost:5433/${config_1.ServerConfig.POSTGRES_DB}`);
exports.db = (0, postgres_js_1.drizzle)(queryClient, {
    schema: { users: models_1.users, chatMembers: models_1.chatMembers, chats: models_1.chats, messages: models_1.messages, requests: models_1.requests },
    logger: true,
});
