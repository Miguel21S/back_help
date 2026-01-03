import { Router } from "express";

import * as building from "../services/buildings.services";
import { auth } from "../../core/middleware/auth";
import { checkAccess } from "../../core/middleware/checkAccess";

const router = Router();
router.post('/auth/admin/create', auth, checkAccess("", ["admin", "superAdmin"]), building.createBuilding);
router.get('/auth/admin/list', auth, checkAccess("", ["admin", "superAdmin"]), building.getAllBuildings);
router.get('/auth/admin/find/:id', auth, checkAccess("", ["admin", "superAdmin"]), building.getBuildingById);
router.put('/auth/admin/update/:id', auth, checkAccess("", ["admin", "superAdmin"]), building.updateBuildingById);
router.delete('/auth/admin/delete/:id', auth, checkAccess("", ["admin", "superAdmin"]), building.deleteBuildingById);
router.get('/auth/building/users/count/:id', auth, checkAccess("", ["admin", "superAdmin"]), building.getfilterElementInBuilding);
router.get('/auth/building/dashboard', auth, checkAccess("", ["admin", "superAdmin"]), building.dashboardBuildig);

export default router;