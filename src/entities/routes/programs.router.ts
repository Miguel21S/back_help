import { Router } from "express";
import { auth } from "../../core/middleware/auth";
import { checkAccess } from "../../core/middleware/checkAccess";
import * as programs from '../services/admin_module_institution/programs.services';

const router = Router()

router.post("/auth/create", auth, checkAccess("", ['superAdmin', 'admin']), programs.createPrograms)
router.get("/auth/list", auth, checkAccess("", ['superAdmin', 'admin']), programs.getPrograms)
router.put("/auth/update/:id", auth, checkAccess("", ['superAdmin', 'admin']), programs.updateProgram)
router.delete("/auth/delete/:id", auth, checkAccess("", ['superAdmin', 'admin']), programs.deleteProgram)

export default router