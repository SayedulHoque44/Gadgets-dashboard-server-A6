"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({}),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
const logInUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
exports.userValidationSchema = {
    registerUserSchema,
    logInUserSchema,
};
