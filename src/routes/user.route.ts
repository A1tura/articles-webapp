import { Router } from "express";
import {test, signup, verifEmail} from "../controllers/user.controller";

const router = Router();

router.get("/test", test);
router.post("/signup", signup)
router.get("/verifEmail/:token", verifEmail)

export default router;