import { Router } from "express";
import { auth } from "../../../core/middleware/auth";
import { checkAccess } from "../../../core/middleware/checkAccess";
import *as clasrom from "../../services/academic_services/classrooms.services";


const route = Router();

route.post('/auth/create', auth, checkAccess('', ['admin', 'superAdmin']), clasrom.createClassroom);
route.get('/auth/list', auth, checkAccess('', ['admin', 'superAdmin']), clasrom.getClassrooms);
route.put('/auth/update/:id', auth, checkAccess('', ['admin', 'superAdmin']), clasrom.updateClassroom);
route.delete('/auth/delete/:id', auth, checkAccess('', ['admin', 'superAdmin']), clasrom.deleteClassroom);

export default route;