"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: user_constant_1.userRoleArray,
        default: "User",
    },
});
//
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
