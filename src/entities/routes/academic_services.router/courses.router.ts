import { Router } from "express";
import * as cousers from '../../services/academic_services/courses.services'
import { auth } from "../../../core/middleware/auth";
import { checkAccess } from "../../../core/middleware/checkAccess";

const route = Router();

route.post('/auth/create', auth, checkAccess('', ['admin', 'superAdmin']), cousers.createCourse);
route.get('/auth/list', auth, checkAccess('', ['admin', 'superAdmin']), cousers.getCourse);
route.put('/auth/update/:id', auth, checkAccess('', ['admin', 'superAdmin']), cousers.updateCourse);
route.delete('/auth/delete/:id', auth, checkAccess('', ['admin', 'superAdmin']), cousers.deleteCourse);

export default route;