import { Router } from "express";
import * as user from '../genereteUserPDF/usersPDF'
import * as building from '../genereteBuildPDF/build.PDF'
import { auth } from "../../core/middleware/auth";
import { isAdmin } from "../../core/middleware/isAdmin";

const router = Router();

router.get('/auth/filterpdfusers', auth, user.generetePdfByFilterUsersInSystem);
router.get('/auth/filterpdfbuildings', auth, isAdmin, building.generetePdfByFilterBuildInSystem);
router.get('/auth/admin/generetionpdf', auth, isAdmin, building.getPdfBuildings);


export default router;