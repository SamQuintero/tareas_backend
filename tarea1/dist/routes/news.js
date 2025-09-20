"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_1 = require("../controllers/news");
const router = (0, express_1.Router)();
router.get("/", news_1.fetchNews);
exports.default = router;
