import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Daily, Monthly, Weekly, Yearly } from "../../utils/DateCalculation";
import { GadgetsModel } from "../Gadgets/gadgets.model";
import { TSales } from "./sales.interface";
import { SalesModel } from "./sales.model";

// add New sales IntoDB
const createSalesIntoDb = async (payload: TSales) => {
  const gadgets = await GadgetsModel.findById(payload.productId);

  if (!gadgets) {
    throw new AppError(httpStatus.NOT_FOUND, "Gadgets not found");
  }
  if (gadgets?.quantity < payload.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Not Enough ${gadgets.name} quantity!`
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const createSales = await SalesModel.create([payload], { session });

    if (!createSales) {
      throw new AppError(httpStatus.BAD_REQUEST, `Faild to create sales`);
    }

    const updateGadgets = await GadgetsModel.findByIdAndUpdate(gadgets._id, {
      quantity: gadgets.quantity - payload.quantity,
    });

    if (!updateGadgets) {
      throw new AppError(httpStatus.BAD_REQUEST, `Faild to create sales`);
    }

    await session.commitTransaction();
    await session.endSession();

    return createSales;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
// add New sales IntoDB
const getSalesFromDb = async (query: Record<string, unknown>) => {
  const { history } = query;
  let modifiedFilter = {};

  if (history) {
    switch (history) {
      case "Daily":
        modifiedFilter = {
          createdAt: Daily(),
        };
        break;
      case "Weekly":
        modifiedFilter = {
          createdAt: Weekly(),
        };
        break;
      case "Monthly":
        modifiedFilter = {
          createdAt: Monthly(),
        };
        break;
      case "Yearly":
        modifiedFilter = {
          createdAt: Yearly(),
        };
        break;

      default:
        break;
    }
  }

  // console.log(modifiedFilter);
  const sales = await SalesModel.find(modifiedFilter).populate("productId");
  return sales;
};

//
const getAvailableGadgetsForSaleFromDB = async () => {
  const availableGadgets = await GadgetsModel.find({
    quantity: {
      $gt: 0,
    },
  });

  return availableGadgets;
};

//
export const salesServices = {
  createSalesIntoDb,
  getSalesFromDb,
  getAvailableGadgetsForSaleFromDB,
};
