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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gadgetsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_constant_1 = require("../User/user.constant");
const gadgets_model_1 = require("./gadgets.model");
// add New Gadgets IntoDB
const addNewGadgetsIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.userId = userId;
    const addGadgets = yield gadgets_model_1.GadgetsModel.create(payload);
    return addGadgets;
});
// delete Gadgets FromDB
const deleteGadgetsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const gadgets = yield gadgets_model_1.GadgetsModel.findById(id);
    if (!gadgets) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Gadgets not found");
    }
    const res = yield gadgets_model_1.GadgetsModel.findByIdAndDelete(id);
    return null;
});
// delete Gadgets FromDB
const deleteMultipleGadgetsFromDB = (gadgetsIdArray) => __awaiter(void 0, void 0, void 0, function* () {
    const gadgets = yield gadgets_model_1.GadgetsModel.deleteMany({
        _id: {
            $in: gadgetsIdArray,
        },
    });
    return null;
});
// get Single Gadgets ById FromDB
const getSingleGadgetsByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const gadgets = yield gadgets_model_1.GadgetsModel.findById(id);
    if (!gadgets) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Gadgets not found");
    }
    return gadgets;
});
//update Single Gadgets ById FromDB
const updateSingleGadgetsByIdFromDB = (gadgetsId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const gadgets = yield gadgets_model_1.GadgetsModel.findById(gadgetsId);
    //
    if (!gadgets) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Gadgets not found");
    }
    //
    const { features } = payload, remainingData = __rest(payload, ["features"]);
    const modifiedObj = Object.assign({}, remainingData);
    //
    if (features && Object.keys(features).length > 0) {
        for (const [key, value] of Object.entries(features)) {
            modifiedObj[`features.${key}`] = value;
        }
    }
    //
    const updatedGadgets = yield gadgets_model_1.GadgetsModel.findByIdAndUpdate(gadgetsId, modifiedObj, {
        runValidators: true,
        new: true,
    });
    return updatedGadgets;
});
//get Gadgets FromDB
const getGadgetsFromDB = (authUser, query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchFields = [
        "name",
        "Category",
        "modelNumber",
        "releaseDate",
        "Brand",
        "modelNumber",
        "Category",
        "operatingSystem",
        "connectivity",
        "powerSource",
        "features.resolution",
        "features.storagecapacity",
        "features.screenSize",
        "features.weight",
        "features.dimensions",
    ];
    let Gadgets;
    if (authUser.role === user_constant_1.userRole.Manager) {
        Gadgets = yield gadgets_model_1.GadgetsModel.find({
            $and: [
                {
                    $or: searchFields.map((field) => ({
                        [field]: { $regex: (query === null || query === void 0 ? void 0 : query.searchTerm) || "", $options: "i" },
                    })),
                },
                {
                    price: {
                        $gte: query.minPrice || 0,
                        $lte: query.maxPrice || 1000000,
                    },
                },
            ],
        });
    }
    else {
        Gadgets = yield gadgets_model_1.GadgetsModel.find({
            $and: [
                {
                    userId: authUser.userId,
                },
                {
                    $or: searchFields.map((field) => ({
                        [field]: { $regex: (query === null || query === void 0 ? void 0 : query.searchTerm) || "", $options: "i" },
                    })),
                },
                {
                    price: {
                        $gte: query.minPrice || 0,
                        $lte: query.maxPrice || 1000000,
                    },
                },
            ],
        });
    }
    return Gadgets;
});
//
exports.gadgetsServices = {
    addNewGadgetsIntoDB,
    deleteGadgetsFromDB,
    getSingleGadgetsByIdFromDB,
    getGadgetsFromDB,
    updateSingleGadgetsByIdFromDB,
    deleteMultipleGadgetsFromDB,
};
