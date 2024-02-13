import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { salesServices } from "./sales.service";

const createSales = catchAsync(async (req, res) => {
  const result = await salesServices.createSalesIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "sales created successfull",
    data: result,
  });
});

const getSales = catchAsync(async (req, res) => {
  const result = await salesServices.getSalesFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "sales retrive successfull",
    data: result,
  });
});

const getAvailableGadgetsForSale = catchAsync(async (req, res) => {
  const result = await salesServices.getAvailableGadgetsForSaleFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available gadgets retrive successfull",
    data: result,
  });
});
//
export const salesControllers = {
  createSales,
  getSales,
  getAvailableGadgetsForSale,
};
