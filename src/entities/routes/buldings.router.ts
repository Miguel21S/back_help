import { Router } from "express";

import * as building from "../services/buildings.services";
import { auth } from "../../core/middleware/auth";
import { isAdmin } from "../../core/middleware/isAdmin";

const router = Router();
router.post('/auth/admin/create', auth, isAdmin, building.createBuilding);
router.get('/auth/admin/list', auth, isAdmin, building.getAllBuildings);
router.get('/auth/admin/find/:id', auth, isAdmin, building.getBuildingById);
router.put('/auth/admin/update/:id', auth, isAdmin, building.updateBuildingById);
router.delete('/auth/admin/delete/:id', auth, isAdmin, building.deleteBuildingById);
router.get('/auth/building/users/count/:id', auth, isAdmin, building.getfilterElementInBuilding);
router.get('/auth/building/count/apartment', auth, isAdmin, building.dashboardBuildig);

export default router;