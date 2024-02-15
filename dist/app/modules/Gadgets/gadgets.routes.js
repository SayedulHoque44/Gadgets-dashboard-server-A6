"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gadgetsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const gadgetOwnerAuth_1 = __importDefault(require("../../middlewares/gadgetOwnerAuth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../User/user.constant");
const gadgets_controller_1 = require("./gadgets.controller");
const gadgets_validation_1 = require("./gadgets.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constant_1.userRole.User, user_constant_1.userRole.Manager), (0, validateRequest_1.default)(gadgets_validation_1.gadgetsValidation.addNewGadgetsSchema), gadgets_controller_1.gadgetsControllers.addNewGadgets);
//
router.patch("/:gadgetsId", (0, auth_1.default)(user_constant_1.userRole.User, user_constant_1.userRole.Manager), (0, gadgetOwnerAuth_1.default)(), (0, validateRequest_1.default)(gadgets_validation_1.gadgetsValidation.updateGadgetsSchema), gadgets_controller_1.gadgetsControllers.updateSingleGadgetsById);
//
router.delete("/", (0, auth_1.default)(user_constant_1.userRole.User, user_constant_1.userRole.Manager), gadgets_controller_1.gadgetsControllers.deleteMultipleGadgets);
//
router.delete("/:gadgetsId", (0, auth_1.default)(user_constant_1.userRole.User, user_constant_1.userRole.Manager), gadgets_controller_1.gadgetsControllers.deleteGadgets);
//
//
router.get("/:gadgetsId", (0, auth_1.default)(user_constant_1.userRole.User, user_constant_1.userRole.Manager), gadgets_controller_1.gadgetsControllers.getSingleGadgetsById);
//
router.get("/", (0, auth_1.default)(user_constant_1.userRole.User, user_constant_1.userRole.Manager), gadgets_controller_1.gadgetsControllers.getGadgets);
//
exports.gadgetsRoutes = router;
