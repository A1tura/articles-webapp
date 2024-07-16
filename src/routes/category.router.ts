import { Router } from "express";

import jwtVerif from "../middlewares/jwt.middleware"
import { createCategory, getCategories, getCategoryArticles, test } from "../controllers/category.controller";

const router = Router();

router.get("/test", jwtVerif, test)
router.post("/create", jwtVerif, createCategory)
router.get("/categories", getCategories);
router.get("/articles/:category", getCategoryArticles)

export default router;