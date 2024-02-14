import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { GadgetsModel } from "../modules/Gadgets/gadgets.model";
import { userRole } from "../modules/User/user.constant";
import catchAsync from "../utils/catchAsync";

const gadgetOwnerAuth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId, role } = (req as any).user;
    const { body, params } = req;

    const gadgets = await GadgetsModel.findById(params.gadgetsId);
    //
    if (!gadgets) {
      throw new AppError(httpStatus.NOT_FOUND, "Gadgets not found");
    }

    if (role !== userRole.Manager) {
      if (gadgets?.userId !== userId) {
        throw new AppError(httpStatus.NOT_FOUND, "Gadgets Owned By Other!");
      }
    }

    next();
  });
};
export default gadgetOwnerAuth;
