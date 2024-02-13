"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sales_controller_1 = require("./sales.controller");
const sales_validation_1 = require("./sales.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(sales_validation_1.createSalesValidation), (0, auth_1.default)(), sales_controller_1.salesControllers.createSales);
router.get("/", (0, auth_1.default)(), sales_controller_1.salesControllers.getSales);
router.get("/forSales", (0, auth_1.default)(), sales_controller_1.salesControllers.getAvailableGadgetsForSale);
exports.salesRoutes = router;
