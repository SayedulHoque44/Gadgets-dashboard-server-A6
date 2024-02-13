"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const registerUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({
        email: payload.email,
    });
    if (user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Already Exits! please Login!");
    }
    const createUser = yield user_model_1.UserModel.create(payload);
    return createUser;
});
const logInUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({
        email: payload.email,
        password: payload.password,
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User email or password invalid");
    }
    const jwtPayload = {
        userId: user._id.toString(),
        name: user.name,
    };
    const token = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return { token };
});
//
exports.userServices = {
    registerUserFromDB,
    logInUserFromDB,
};
