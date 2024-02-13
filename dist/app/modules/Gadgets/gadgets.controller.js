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
exports.gadgetsControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const gadgets_service_1 = require("./gadgets.service");
const addNewGadgets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gadgets_service_1.gadgetsServices.addNewGadgetsIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "gadgets added successfull",
        data: result,
    });
}));
const deleteGadgets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gadgets_service_1.gadgetsServices.deleteGadgetsFromDB(req.params.gadgetsId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "gadgets deleted successfull",
        data: null,
    });
}));
const deleteMultipleGadgets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gadgets_service_1.gadgetsServices.deleteMultipleGadgetsFromDB(req.body.gadgetsIdArray);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "gadgets are deleted successfull",
        data: null,
    });
}));
const getSingleGadgetsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gagets = yield gadgets_service_1.gadgetsServices.getSingleGadgetsByIdFromDB(req.params.gadgetsId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "gadgets retrive successfull",
        data: gagets,
    });
}));
//
const updateSingleGadgetsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedGagets = yield gadgets_service_1.gadgetsServices.updateSingleGadgetsByIdFromDB(req.params.gadgetsId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "gadgets updated successfull",
        data: updatedGagets,
    });
}));
const getGadgets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gagets = yield gadgets_service_1.gadgetsServices.getGadgetsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "gadgets are retrive successfull",
        data: gagets,
    });
}));
//
exports.gadgetsControllers = {
    addNewGadgets,
    deleteGadgets,
    getSingleGadgetsById,
    getGadgets,
    updateSingleGadgetsById,
    deleteMultipleGadgets,
};
