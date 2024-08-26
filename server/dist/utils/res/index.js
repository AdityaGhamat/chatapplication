"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.ApiSuccess = void 0;
const apisuccess_1 = __importDefault(require("./apisuccess"));
exports.ApiSuccess = apisuccess_1.default;
const apierror_1 = __importDefault(require("./apierror"));
exports.ApiError = apierror_1.default;
