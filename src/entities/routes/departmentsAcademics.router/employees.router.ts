import { Router } from "express";
import { auth } from "../../../core/middleware/auth";
import { checkAccess } from "../../../core/middleware/checkAccess";
import * as employ from "../../services/admin_institution_services/employees.services";

const route = Router();

route.post('/auth/create', auth, checkAccess('', ['admin', 'superAdmin']), employ.createEmployee);
route.get('/auth/list', auth, checkAccess('', ['admin', 'superAdmin']), employ.getEmployee);
route.put('/auth/update/:id', auth, checkAccess('', ['admin', 'superAdmin']), employ.updateEmployee);
route.delete('/auth/delete/:id', auth, checkAccess('', ['admin', 'superAdmin']), employ.deleteEmployee);

export default route;