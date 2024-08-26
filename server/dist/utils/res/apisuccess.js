"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiSuccess {
    constructor(statusCode, message, data, success = true) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    toJson() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            success: this.success,
            data: this.data,
        };
    }
}
exports.default = ApiSuccess;
