import { Router } from "express";
import * as user from '../genereteUserPDF/usersPDF'
import * as building from '../genereteBuildPDF/build.PDF'
import { auth } from "../../core/middleware/auth";
import { checkAccess } from "../../core/middleware/checkAccess";

const router = Router();

router.post('/auth/filterpdfusers', auth, checkAccess("", ["superAdmin", "admin"]), user.generetePdfByFilterUsersInSystem);
router.post('/auth/filterpdfbuildings', auth, checkAccess("", ["superAdmin", "admin"]), building.generetePdfByFilterBuildInSystem);


export default router;