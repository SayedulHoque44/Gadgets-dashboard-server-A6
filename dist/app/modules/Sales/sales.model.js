"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModel = void 0;
const mongoose_1 = require("mongoose");
const salesSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "gadgets",
    },
    quantity: {
        type: Number,
        required: true,
    },
    buyerName: {
        type: String,
        required: true,
    },
}, { timestamps: true });
//
exports.SalesModel = (0, mongoose_1.model)("sales", salesSchema);
