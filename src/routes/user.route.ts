import { Router } from "express";
import {test, signup} from "../controllers/user.controller";

const router = Router();

router.get("/test", test);
router.post("/signup", signup)

export default router;