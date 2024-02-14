import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { userRole } from "../User/user.constant";
import { salesControllers } from "./sales.controller";
import { createSalesValidation } from "./sales.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createSalesValidation),
  auth(userRole.User, userRole.Manager),
  salesControllers.createSales
);
router.get(
  "/",
  auth(userRole.User, userRole.Manager),
  salesControllers.getSales
);
router.get(
  "/forSales",
  auth(userRole.User, userRole.Manager),
  salesControllers.getAvailableGadgetsForSale
);

export const salesRoutes = router;
