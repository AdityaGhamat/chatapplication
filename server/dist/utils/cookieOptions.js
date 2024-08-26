"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = void 0;
const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};
exports.cookieOptions = cookieOptions;
