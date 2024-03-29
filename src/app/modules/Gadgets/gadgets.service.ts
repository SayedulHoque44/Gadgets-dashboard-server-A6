import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { userRole } from "../User/user.constant";
import { TGadgets } from "./gadgets.interface";
import { GadgetsModel } from "./gadgets.model";

// add New Gadgets IntoDB
const addNewGadgetsIntoDB = async (userId: string, payload: TGadgets) => {
  payload.userId = userId;
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
  gadgetsId: string,
  payload: Partial<TGadgets>
) => {
  const gadgets = await GadgetsModel.findById(gadgetsId);
  //
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
  const updatedGadgets = await GadgetsModel.findByIdAndUpdate(
    gadgetsId,
    modifiedObj,
    {
      runValidators: true,
      new: true,
    }
  );
  return updatedGadgets;
};
//get Gadgets FromDB
const getGadgetsFromDB = async (
  authUser: JwtPayload,
  query: Record<string, unknown>
) => {
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
  let Gadgets;
  if (authUser.role === userRole.Manager) {
    Gadgets = await GadgetsModel.find({
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
  } else {
    Gadgets = await GadgetsModel.find({
      $and: [
        {
          userId: authUser.userId,
        },
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
  }

  return Gadgets;
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
