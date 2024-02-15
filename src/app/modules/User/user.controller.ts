import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const regInfo = req.body;
  const createdUser = await userServices.registerUserFromDB(regInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User register successfull!",
    data: null,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const regInfo = req.body;
  const result = await userServices.logInUserFromDB(regInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfull!",
    data: result,
  });
});

//
export const userControllers = {
  registerUser,
  loginUser,
};
