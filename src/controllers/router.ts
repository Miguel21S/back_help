import { Router } from "express";
import * as controllers from "./authController";

const router = Router();

router.post("/auth/register", controllers.register);
router.post("/auth/login", controllers.login);

export default router;