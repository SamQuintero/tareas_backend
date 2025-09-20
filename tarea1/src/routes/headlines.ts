import { Router } from "express";
import { fetchHeadlines } from "../controllers/headlines";

const router = Router();

router.get("/", fetchHeadlines);

export default router;