"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, statusCode, success = false) {
        super(message);
        this.name = message;
        this.statusCode = statusCode;
        this.success = success;
    }
    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            name: this.name,
            message: this.message,
        };
    }
}
exports.default = ApiError;
