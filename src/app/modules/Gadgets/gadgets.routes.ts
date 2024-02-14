import express from "express";
import auth from "../../middlewares/auth";
import gadgetOwnerAuth from "../../middlewares/gadgetOwnerAuth";
import validateRequest from "../../middlewares/validateRequest";
import { userRole } from "../User/user.constant";
import { gadgetsControllers } from "./gadgets.controller";
import { gadgetsValidation } from "./gadgets.validation";
const router = express.Router();

router.post(
  "/",
  auth(userRole.User, userRole.Manager),
  validateRequest(gadgetsValidation.addNewGadgetsSchema),
  gadgetsControllers.addNewGadgets
);
//
router.patch(
  "/:gadgetsId",
  auth(userRole.User, userRole.Manager),
  gadgetOwnerAuth(),
  validateRequest(gadgetsValidation.updateGadgetsSchema),
  gadgetsControllers.updateSingleGadgetsById
);
//
router.delete(
  "/",
  auth(userRole.User, userRole.Manager),
  gadgetsControllers.deleteMultipleGadgets
);
//
router.delete(
  "/:gadgetsId",
  auth(userRole.User, userRole.Manager),
  gadgetsControllers.deleteGadgets
);
//
//
router.get(
  "/:gadgetsId",
  auth(userRole.User, userRole.Manager),
  gadgetsControllers.getSingleGadgetsById
);
//
router.get(
  "/",
  auth(userRole.User, userRole.Manager),
  gadgetsControllers.getGadgets
);

//
export const gadgetsRoutes = router;
