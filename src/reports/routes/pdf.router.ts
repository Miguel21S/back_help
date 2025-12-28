import { Router } from "express";
import * as user from '../genereteUserPDF/usersPDF'
import * as building from '../genereteBuildPDF/build.PDF'
import { auth } from "../../core/middleware/auth";
import { isAdmin } from "../../core/middleware/isAdmin";

const router = Router();

router.post('/auth/filterpdfusers', auth, isAdmin, user.generetePdfByFilterUsersInSystem);
router.post('/auth/filterpdfbuildings', auth, isAdmin, building.generetePdfByFilterBuildInSystem);


export default router;