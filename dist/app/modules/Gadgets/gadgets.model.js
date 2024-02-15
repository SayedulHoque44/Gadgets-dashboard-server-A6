"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GadgetsModel = void 0;
const mongoose_1 = require("mongoose");
const featuresSchema = new mongoose_1.Schema({
    resolution: String,
    storagecapacity: String,
    screenSize: String,
    weight: String,
    dimensions: String,
}, { _id: false });
const gadgetsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    Brand: {
        type: String,
        required: true,
    },
    modelNumber: {
        type: String,
        required: true,
        unique: true,
    },
    Category: {
        type: String,
        required: true,
    },
    operatingSystem: String,
    connectivity: String,
    powerSource: String,
    features: featuresSchema,
}, {
    timestamps: true,
});
//
exports.GadgetsModel = (0, mongoose_1.model)("gadgets", gadgetsSchema);
