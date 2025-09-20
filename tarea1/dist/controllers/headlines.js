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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHeadlines = void 0;
const newsapi_1 = require("../service/newsapi");
const fetchHeadlines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { country, category, q, pageSize, page } = req.query;
        const headlines = yield (0, newsapi_1.getHeadlines)({
            country: country,
            category: category,
            q: q,
            pageSize: pageSize,
            page: page
        });
        res.json(headlines);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchHeadlines = fetchHeadlines;
