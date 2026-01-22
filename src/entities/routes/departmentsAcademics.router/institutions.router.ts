import { Router } from "express";
import * as institution from '../../services/admin_institution_services/institution.services';
import * as faculty from '../../services/admin_institution_services/faculties.services';
import { auth } from "../../../core/middleware/auth";
import { checkAccess } from "../../../core/middleware/checkAccess";

const router = Router()

router.post('/auth/create', auth, checkAccess("", ["admin", "superAdmin"]), institution.createInstitution);
router.get('/auth/list', institution.getInstitution);
router.put('/auth/update/:id', auth, checkAccess("", ["admin", "superAdmin"]), institution.updateInstitution);

///////////////   ROUTER FACULTIES
router.post('/faculty/auth/crate', auth, checkAccess("", ["faculty_manager", "admin", "superAdmin"]), faculty.createFaculty)
router.get('/faculty/auth/list', auth, checkAccess("", ["faculty_manager", "admin", "superAdmin"]), faculty.getListFaculties)
router.put('/faculty/auth/update/:id', auth, checkAccess("", ["faculty_manager", "admin", "superAdmin"]), faculty.updateFacultyById)
router.delete('/faculty/auth/remove/:id', auth, checkAccess("", ["faculty_manager", "admin", "superAdmin"]), faculty.deletedFacultyById)
export default router;