"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.logoutUser = logoutUser;
const services_1 = require("../services");
const res_1 = require("../utils/res");
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createUser(req, res) {
    try {
        const { name, username, password, avatar, url } = req.body;
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const response = await services_1.UserServices.createUser({
            name,
            username,
            password: hashPassword,
            avatar,
            url,
        });
        if (response instanceof res_1.ApiError) {
            return res.status(response.statusCode).json(response.toJSON());
        }
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.CREATED, "User Created Successfully", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const response = await services_1.UserServices.loginUser({ username, password });
        if (response instanceof res_1.ApiError) {
            return res.status(response.statusCode).json(response.toJSON());
        }
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.ACCEPTED, "user logged in successfully", {});
        return res
            .status(success.statusCode)
            .cookie("token", response.token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            httpOnly: true,
            secure: true,
        })
            .json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function getUser(req, res) {
    try {
        const id = req.id;
        const response = await services_1.UserServices.getUser(id);
        if (response instanceof res_1.ApiError) {
            return res.status(response.statusCode).json(response.toJSON());
        }
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.ACCEPTED, "Successfully found user", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function updateUser(req, res) {
    try {
        const id = req.id;
        const response = await services_1.UserServices.updateUser(id, req.body);
        if (response instanceof res_1.ApiError) {
            return res.status(response.statusCode).json(response.toJSON());
        }
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.ACCEPTED, "Successfully updated user", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function deleteUser(req, res) {
    try {
        const id = req.id;
        const response = await services_1.UserServices.deleteUser(id);
        if (response instanceof res_1.ApiError) {
            return res.status(response.statusCode).json(response.toJSON());
        }
        const success = new res_1.ApiSuccess(http_status_codes_1.StatusCodes.ACCEPTED, "Successfully deleted", response);
        return res.status(success.statusCode).json(success.toJson());
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
async function logoutUser(req, res) {
    try {
        res
            .clearCookie("token", {
            sameSite: "none",
            httpOnly: true,
            secure: true,
        })
            .status(http_status_codes_1.StatusCodes.OK)
            .json(new res_1.ApiSuccess(http_status_codes_1.StatusCodes.OK, "Successfully logged out", {}));
    }
    catch (error) {
        if (error instanceof res_1.ApiError) {
            return res.status(error.statusCode).json(error.toJSON());
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
