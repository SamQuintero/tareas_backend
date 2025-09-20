"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sources_1 = require("../controllers/sources");
const router = (0, express_1.Router)();
router.get("/", sources_1.fetchSources);
exports.default = router;
