"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_1 = __importDefault(require("./news"));
const headlines_1 = __importDefault(require("./headlines"));
const sources_1 = __importDefault(require("./sources"));
const router = (0, express_1.Router)();
router.use('/news', news_1.default);
router.use('/headlines', headlines_1.default);
router.use('/sources', sources_1.default);
exports.default = router;
