import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { gadgetsControllers } from "./gadgets.controller";
import { gadgetsValidation } from "./gadgets.validation";
const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(gadgetsValidation.addNewGadgetsSchema),
  gadgetsControllers.addNewGadgets
);
//
router.patch(
  "/:gadgetsId",
  auth(),
  validateRequest(gadgetsValidation.updateGadgetsSchema),
  gadgetsControllers.updateSingleGadgetsById
);
//
router.delete("/", auth(), gadgetsControllers.deleteMultipleGadgets);
//
router.delete("/:gadgetsId", auth(), gadgetsControllers.deleteGadgets);
//
//
router.get("/:gadgetsId", auth(), gadgetsControllers.getSingleGadgetsById);
//
router.get("/", auth(), gadgetsControllers.getGadgets);

//
export const gadgetsRoutes = router;
