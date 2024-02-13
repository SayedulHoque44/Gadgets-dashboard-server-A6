import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { salesControllers } from "./sales.controller";
import { createSalesValidation } from "./sales.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createSalesValidation),
  auth(),
  salesControllers.createSales
);
router.get("/", auth(), salesControllers.getSales);
router.get("/forSales", auth(), salesControllers.getAvailableGadgetsForSale);

export const salesRoutes = router;
