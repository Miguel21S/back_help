import { Router } from "express";
import { auth } from "../../../core/middleware/auth";
import { checkAccess } from "../../../core/middleware/checkAccess";
import * as studts from "../../services/students_services/students.services";

const route = Router();

route.post('/auth/create', auth, checkAccess('', ['admin', 'superAdmin']), studts.createStudents);
route.get('/auth/list', auth, checkAccess('', ['admin', 'superAdmin']), studts.getStudents);
route.put('/auth/update/:id', auth, checkAccess('', ['admin', 'superAdmin']), studts.updateStudent);
route.delete('/auth/delete/:id', auth, checkAccess('', ['admin', 'superAdmin']), studts.deleteStudent);

export default route;