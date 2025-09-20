"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const headlines_1 = require("../controllers/headlines");
const router = (0, express_1.Router)();
router.get("/", headlines_1.fetchHeadlines);
exports.default = router;
