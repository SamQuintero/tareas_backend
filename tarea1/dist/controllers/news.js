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
exports.fetchNews = void 0;
const newsapi_1 = require("../service/newsapi");
const fetchNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q, from, to, language, sortBy } = req.query;
        const news = yield (0, newsapi_1.getEverything)({
            q: q,
            from: from,
            to: to,
            language: language,
            sortBy: sortBy,
        });
        res.json(news);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchNews = fetchNews;
