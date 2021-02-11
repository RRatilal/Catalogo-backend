"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImageFilesController_1 = __importDefault(require("./controllers/ImageFilesController"));
const multer_1 = __importDefault(require("./confg/multer"));
const multer_2 = __importDefault(require("multer"));
const routes = express_1.Router();
const upload = multer_2.default(multer_1.default);
routes.get("/uploads", ImageFilesController_1.default.show);
routes.post("/uploads", upload.single('image'), ImageFilesController_1.default.create);
exports.default = routes;
