import { Router } from "express";
import {test} from "../controllers/article.controller";

import jwtVerif from "../middlewares/jwt.middleware"

const router = Router();

router.get("/test", jwtVerif, test);

export default router;