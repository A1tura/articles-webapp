import { Router } from "express";
import {createArticle, test} from "../controllers/article.controller";

import jwtVerif from "../middlewares/jwt.middleware"

const router = Router();

router.get("/test", jwtVerif, test);
router.post("/create", jwtVerif, createArticle);

export default router;