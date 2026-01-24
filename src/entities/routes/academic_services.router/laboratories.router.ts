import { Router } from "express";
import * as labs from '../../services/academic_services/laboratories.services'
import { auth } from "../../../core/middleware/auth";
import { checkAccess } from "../../../core/middleware/checkAccess";

const route = Router();

route.post('/auth/create', auth, checkAccess('', ['admin', 'superAdmin']), labs.createLaboratory);
route.get('/auth/list', auth, checkAccess('', ['admin', 'superAdmin']), labs.getLaboratory);
route.put('/auth/update/:id', auth, checkAccess('', ['admin', 'superAdmin']), labs.updateLaboratory);
// route.delete('/auth/delete/:id', auth, checkAccess('', ['admin', 'superAdmin']), labs.deleteLaboratory);

export default route