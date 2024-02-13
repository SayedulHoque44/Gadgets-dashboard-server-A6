"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DateCalculation_1 = require("../../utils/DateCalculation");
const gadgets_model_1 = require("../Gadgets/gadgets.model");
const sales_model_1 = require("./sales.model");
// add New sales IntoDB
const createSalesIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const gadgets = yield gadgets_model_1.GadgetsModel.findById(payload.productId);
    if (!gadgets) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Gadgets not found");
    }
    if ((gadgets === null || gadgets === void 0 ? void 0 : gadgets.quantity) < payload.quantity) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Not Enough ${gadgets.name} quantity!`);
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const createSales = yield sales_model_1.SalesModel.create([payload], { session });
        if (!createSales) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Faild to create sales`);
        }
        const updateGadgets = yield gadgets_model_1.GadgetsModel.findByIdAndUpdate(gadgets._id, {
            quantity: gadgets.quantity - payload.quantity,
        });
        if (!updateGadgets) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Faild to create sales`);
        }
        yield session.commitTransaction();
        yield session.endSession();
        return createSales;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
// add New sales IntoDB
const getSalesFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { history } = query;
    let modifiedFilter = {};
    if (history) {
        switch (history) {
            case "Daily":
                modifiedFilter = {
                    createdAt: (0, DateCalculation_1.Daily)(),
                };
                break;
            case "Weekly":
                modifiedFilter = {
                    createdAt: (0, DateCalculation_1.Weekly)(),
                };
                break;
            case "Monthly":
                modifiedFilter = {
                    createdAt: (0, DateCalculation_1.Monthly)(),
                };
                break;
            case "Yearly":
                modifiedFilter = {
                    createdAt: (0, DateCalculation_1.Yearly)(),
                };
                break;
            default:
                break;
        }
    }
    // console.log(modifiedFilter);
    const sales = yield sales_model_1.SalesModel.find(modifiedFilter).populate("productId");
    return sales;
});
//
const getAvailableGadgetsForSaleFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const availableGadgets = yield gadgets_model_1.GadgetsModel.find({
        quantity: {
            $gt: 0,
        },
    });
    return availableGadgets;
});
//
exports.salesServices = {
    createSalesIntoDb,
    getSalesFromDb,
    getAvailableGadgetsForSaleFromDB,
};
