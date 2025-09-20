import { Router } from "express";
import newsRoutes from "./news";
import headlinesRoutes from "./headlines";
import sourcesRoutes from "./sources";


const router = Router();

router.use('/news', newsRoutes)
router.use('/headlines', headlinesRoutes)
router.use('/sources', sourcesRoutes)

export default router;

