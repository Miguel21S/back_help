import { Router } from "express";
import * as subjects from '../../services/academic_services/subjects.sevices'
import { auth } from "../../../core/middleware/auth";
import { checkAccess } from "../../../core/middleware/checkAccess";

const route = Router();

route.post('/auth/create', auth, checkAccess('', ['admin', 'superAdmin']), subjects.createSubject);
route.get('/auth/list', auth, checkAccess('', ['admin', 'superAdmin']), subjects.getSubject);
route.put('/auth/update/:id', auth, checkAccess('', ['admin', 'superAdmin']), subjects.updateSubject);
route.delete('/auth/delete/:id', auth, checkAccess('', ['admin', 'superAdmin']), subjects.deleteSubject);

export default route