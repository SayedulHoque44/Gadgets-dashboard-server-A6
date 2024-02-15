import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { gadgetsServices } from "./gadgets.service";

const addNewGadgets = catchAsync(async (req, res) => {
  const { userId } = (req as any).user;

  const result = await gadgetsServices.addNewGadgetsIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "gadgets added successfull!",
    data: result,
  });
});

const deleteGadgets = catchAsync(async (req, res) => {
  const result = await gadgetsServices.deleteGadgetsFromDB(
    req.params.gadgetsId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "gadgets deleted successfull!",
    data: null,
  });
});

const deleteMultipleGadgets = catchAsync(async (req, res) => {
  const result = await gadgetsServices.deleteMultipleGadgetsFromDB(
    req.body.gadgetsIdArray
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "gadgets are deleted successfull!",
    data: null,
  });
});

const getSingleGadgetsById = catchAsync(async (req, res) => {
  const gagets = await gadgetsServices.getSingleGadgetsByIdFromDB(
    req.params.gadgetsId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "gadgets retrive successfull!",
    data: gagets,
  });
});
//
const updateSingleGadgetsById = catchAsync(async (req, res) => {
  const { body, params } = req;

  const updatedGagets = await gadgetsServices.updateSingleGadgetsByIdFromDB(
    params.gadgetsId,
    body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "gadgets updated successfull!",
    data: updatedGagets,
  });
});

const getGadgets = catchAsync(async (req, res) => {
  const authUser = (req as any).user;
  const gagets = await gadgetsServices.getGadgetsFromDB(authUser, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "gadgets are retrive successfull!",
    data: gagets,
  });
});

//
export const gadgetsControllers = {
  addNewGadgets,
  deleteGadgets,
  getSingleGadgetsById,
  getGadgets,
  updateSingleGadgetsById,
  deleteMultipleGadgets,
};
