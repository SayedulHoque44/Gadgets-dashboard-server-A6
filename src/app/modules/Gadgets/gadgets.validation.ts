import { z } from "zod";

// features schema
const featuresSchema = z.object({
  resolution: z.string().optional(),
  storagecapacity: z.string().optional(),
  screenSize: z.string().optional(),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
});
// add New Gadgets Schema
const addNewGadgetsSchema = z.object({
  body: z.object({
    name: z.string(),
    imageUrl: z.string(),
    price: z.number(),
    quantity: z.number(),
    releaseDate: z.string(),
    Brand: z.string(),
    modelNumber: z.string(),
    Category: z.string(),
    operatingSystem: z.string().optional(),
    connectivity: z.string().optional(),
    powerSource: z.string().optional(),
    features: featuresSchema.optional(),
  }),
});
// update Gadgets Schema
const updateGadgetsSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    imageUrl: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    releaseDate: z.string().optional(),
    Brand: z.string().optional(),
    modelNumber: z.string().optional(),
    Category: z.string().optional(),
    operatingSystem: z.string().optional(),
    connectivity: z.string().optional(),
    powerSource: z.string().optional(),
    features: featuresSchema.optional(),
  }),
});

export const gadgetsValidation = {
  addNewGadgetsSchema,
  updateGadgetsSchema,
};
