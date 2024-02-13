import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";
import { userValidationSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchema.registerUserSchema),
  userControllers.registerUser
);
router.post(
  "/login",
  validateRequest(userValidationSchema.logInUserSchema),
  userControllers.loginUser
);

//
export const UserRoutes = router;
