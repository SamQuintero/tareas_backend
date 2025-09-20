import { Router } from "express";
import { fetchSources} from "../controllers/sources";

const router = Router();

router.get("/", fetchSources);

export default router;