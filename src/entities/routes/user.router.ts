import { Router } from "express";
import * as user from "../services/users.services";
import { auth } from "../../core/middleware/auth";
import { isAdmin } from "../../core/middleware/isAdmin";


const router = Router();

router.get('/auth/admin/list', auth, isAdmin, user.getUsers);
router.put('/auth/admin/update/:id', auth, user.updateUsers);
router.get('/auth/admin/find/:id', auth, isAdmin, user.getUserById)
router.delete('/auth/admin/delete/:id', auth, isAdmin, user.deleteUser);
router.get('/user/email', user.compareEmail);
router.get('/auth/comapremail/user/:id', auth, user.CheckEmailUser)
router.get('/auth/dashboard/users', auth, user.dashboardUsers);
router.get('/auth/profile', auth, user.getPrifile);
router.get('/auth/getmyimage', auth, user.getMyAllImage)
router.put('/auth/chagepassword/:id', auth, user.changePassword)

export default router;