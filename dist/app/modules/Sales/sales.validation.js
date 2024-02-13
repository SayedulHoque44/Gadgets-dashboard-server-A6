"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSalesValidation = void 0;
const zod_1 = require("zod");
exports.createSalesValidation = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number(),
        buyerName: zod_1.z.string(),
    }),
});
