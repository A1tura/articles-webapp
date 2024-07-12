import { Router } from "express";
import {test, signup, signin, verifEmail} from "../controllers/user.controller";

const router = Router();

router.get("/test", test);
router.post("/signup", signup)
router.post("/signin", signin)
router.get("/verifEmail/:token", verifEmail)

export default router;