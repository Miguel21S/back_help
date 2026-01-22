import { Router } from "express";
import { auth } from "../../../core/middleware/auth";
import { checkAccess } from "../../../core/middleware/checkAccess";
import * as teachers from '../../services/admin_institution_services/teachers.services';

const router = Router();

router.post("/auth/create", auth, checkAccess("", ["admin", "superAdmin"]), teachers.createTeacher)
router.get("/auth/list", auth, checkAccess("", ["admin", "superAdmin"]), teachers.getTeachers)
router.put("/auth/update/:id", auth, checkAccess("", ["admin", "superAdmin"]), teachers.updateTeacher)
router.delete("/auth/delete/:id", auth, checkAccess("", ["admin", "superAdmin"]), teachers.deleteTeacher)

export default router