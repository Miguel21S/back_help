import { Router } from "express";
import * as user from "../services/admin_module_institution/users.services";
import { auth } from "../../core/middleware/auth";
import { checkAccess, } from "../../core/middleware/checkAccess";


const router = Router();

router.get('/auth/admin/list', auth, checkAccess("manage_users", ["admin", "superAdmin"]), user.getUsers);
router.put('/auth/admin/update/:id', auth, user.updateUsers);
router.get('/auth/admin/find/:id', auth, checkAccess("", ["admin", "superAdmin"]), user.getUserById)
router.delete('/auth/admin/delete/:id', auth, checkAccess("", ["admin", "superAdmin"]), user.deleteUser);
router.get('/user/email', user.compareEmail);
router.get('/auth/comapremail/user/:id', auth, user.CheckEmailUser)
router.get('/auth/dashboard/users', auth, user.dashboardUsers);
router.get('/auth/profile', auth, user.getProfile);
router.get('/auth/getmyimage', auth, user.getMyAllImage)
router.put('/auth/chagepassword/:id', auth, user.changePassword)
router.put('/auth/updaterole', auth, checkAccess("manage_users"), user.changeRole)
router.post('/auth/asignpermission', auth, checkAccess("", ["admin", "superAdmin"]), user.asignPermissionInUser)

export default router;