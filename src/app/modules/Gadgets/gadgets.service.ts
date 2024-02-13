import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TGadgets } from "./gadgets.interface";
import { GadgetsModel } from "./gadgets.model";

// add New Gadgets IntoDB
const addNewGadgetsIntoDB = async (payload: TGadgets) => {
  const addGadgets = await GadgetsModel.create(payload);
  return addGadgets;
};
// delete Gadgets FromDB
const deleteGadgetsFromDB = async (id: string) => {
  const gadgets = await GadgetsModel.findById(id);
  if (!gadgets) {
    throw new AppError(httpStatus.NOT_FOUND, "Gadgets not found");
  }
  const res = await GadgetsModel.findByIdAndDelete(id);
  return null;
};
// delete Gadgets FromDB
const deleteMultipleGadgetsFromDB = async (gadgetsIdArray: string[]) => {
  const gadgets = await GadgetsModel.deleteMany({
    _id: {
      $in: gadgetsIdArray,
    },
  });

  return null;
};
// get Single Gadgets ById FromDB
const getSingleGadgetsByIdFromDB = async (id: string) => {
  const gadgets = await GadgetsModel.findById(id);
  if (!gadgets) {
    throw new AppError(httpStatus.NOT_FOUND, "Gadgets not found");
  }
  return gadgets;
};
//update Single Gadgets ById FromDB
const updateSingleGadgetsByIdFromDB = async (
  id: string,
  payload: Partial<TGadgets>
) => {
  //
  const gadgets = await GadgetsModel.findById(id);
  if (!gadgets) {
    throw new AppError(httpStatus.NOT_FOUND, "Gadgets not found");
  }
  //
  const { features, ...remainingData } = payload;
  const modifiedObj: Record<string, unknown> = { ...remainingData };
  //
  if (features && Object.keys(features).length > 0) {
    for (const [key, value] of Object.entries(features)) {
      modifiedObj[`features.${key}`] = value;
    }
  }
  //
  const updatedGadgets = await GadgetsModel.findByIdAndUpdate(id, modifiedObj, {
    runValidators: true,
    new: true,
  });
  return updatedGadgets;
};
//get Gadgets FromDB
const getGadgetsFromDB = async (query: Record<string, unknown>) => {
  const searchFields = [
    "name",
    "Category",
    "modelNumber",
    "releaseDate",
    "Brand",
    "modelNumber",
    "Category",
    "operatingSystem",
    "connectivity",
    "powerSource",
    "features.resolution",
    "features.storagecapacity",
    "features.screenSize",
    "features.weight",
    "features.dimensions",
  ];

  const Gadgetss = await GadgetsModel.find({
    $and: [
      {
        $or: searchFields.map((field) => ({
          [field]: { $regex: query?.searchTerm || "", $options: "i" },
        })),
      },
      {
        price: {
          $gte: query.minPrice || 0,
          $lte: query.maxPrice || 1000000,
        },
      },
    ],
  });
  return Gadgetss;
};

//
export const gadgetsServices = {
  addNewGadgetsIntoDB,
  deleteGadgetsFromDB,
  getSingleGadgetsByIdFromDB,
  getGadgetsFromDB,
  updateSingleGadgetsByIdFromDB,
  deleteMultipleGadgetsFromDB,
};
