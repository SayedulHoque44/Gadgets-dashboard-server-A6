import { Schema, model } from "mongoose";
import { TFeatures, TGadgets } from "./gadgets.interface";

const featuresSchema = new Schema<TFeatures>(
  {
    resolution: String,
    storagecapacity: String,
    screenSize: String,
    weight: String,
    dimensions: String,
  },
  { _id: false }
);

const gadgetsSchema = new Schema<TGadgets>(
  {
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
  },
  {
    timestamps: true,
  }
);

//
export const GadgetsModel = model<TGadgets>("gadgets", gadgetsSchema);
