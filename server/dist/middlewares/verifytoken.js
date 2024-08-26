"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const res_1 = require("../utils/res");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
async function verifytoken(req, res, next) {
    try {
        const token = req.cookies["token"];
        if (!token) {
            return next(new res_1.ApiError("User not authenticated", http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.ServerConfig.JWT_SECRET);
        if (!decoded) {
            return next(new res_1.ApiError("User token invalid", http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
        req.id = decoded;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new res_1.ApiError("Token has expired", http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
        if (error.name === "JsonWebTokenError") {
            return next(new res_1.ApiError("Invalid token", http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
        next(new res_1.ApiError("Authentication failed", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
    }
}
exports.default = verifytoken;
