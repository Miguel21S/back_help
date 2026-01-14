import { Router } from "express";
import * as dept from '../services/Admin_Module/departmentsAcademics';
import { auth } from "../../core/middleware/auth";
import { checkAccess } from "../../core/middleware/checkAccess";

const route = Router();

route.post('/auth/create', auth, checkAccess("", ["admin", "superAdmin"]), dept.createDepartment);
route.get('/auth/list', auth, checkAccess("", ["admin", "superAdmin"]), dept.getListDepartments);
route.put('/auth/update/:id', auth, checkAccess("", ["admin", "superAdmin"]), dept.updateDepartment);
route.delete('/auht/delete/:id', auth, checkAccess("", ["admin", "superAdmin"]), dept.deleteDepartmentById)

export default route