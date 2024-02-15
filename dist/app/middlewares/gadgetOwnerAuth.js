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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const gadgets_model_1 = require("../modules/Gadgets/gadgets.model");
const user_constant_1 = require("../modules/User/user.constant");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const gadgetOwnerAuth = () => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, role } = req.user;
        const { body, params } = req;
        const gadgets = yield gadgets_model_1.GadgetsModel.findById(params.gadgetsId);
        //
        if (!gadgets) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Gadgets not found");
        }
        if (role !== user_constant_1.userRole.Manager) {
            if ((gadgets === null || gadgets === void 0 ? void 0 : gadgets.userId) !== userId) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Gadgets Owned By Other!");
            }
        }
        next();
    }));
};
exports.default = gadgetOwnerAuth;
