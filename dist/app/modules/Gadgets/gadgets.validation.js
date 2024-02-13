"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gadgetsValidation = void 0;
const zod_1 = require("zod");
// features schema
const featuresSchema = zod_1.z.object({
    resolution: zod_1.z.string().optional(),
    storagecapacity: zod_1.z.string().optional(),
    screenSize: zod_1.z.string().optional(),
    weight: zod_1.z.string().optional(),
    dimensions: zod_1.z.string().optional(),
});
// add New Gadgets Schema
const addNewGadgetsSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        imageUrl: zod_1.z.string(),
        price: zod_1.z.number(),
        quantity: zod_1.z.number(),
        releaseDate: zod_1.z.string(),
        Brand: zod_1.z.string(),
        modelNumber: zod_1.z.string(),
        Category: zod_1.z.string(),
        operatingSystem: zod_1.z.string().optional(),
        connectivity: zod_1.z.string().optional(),
        powerSource: zod_1.z.string().optional(),
        features: featuresSchema.optional(),
    }),
});
// update Gadgets Schema
const updateGadgetsSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        imageUrl: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        quantity: zod_1.z.number().optional(),
        releaseDate: zod_1.z.string().optional(),
        Brand: zod_1.z.string().optional(),
        modelNumber: zod_1.z.string().optional(),
        Category: zod_1.z.string().optional(),
        operatingSystem: zod_1.z.string().optional(),
        connectivity: zod_1.z.string().optional(),
        powerSource: zod_1.z.string().optional(),
        features: featuresSchema.optional(),
    }),
});
exports.gadgetsValidation = {
    addNewGadgetsSchema,
    updateGadgetsSchema,
};
