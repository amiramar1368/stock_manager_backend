import { Router } from "express";

import "../model/define-relation.js";
import UserRoutes from "./user-routes.js";
import RoleRoutes from "./role-routes.js";
import GoodRoutes from "./good-routes.js";
import CategoryRoutes from './category-routes.js'
import WarehouseRoutes from "./warehouse-routes.js";
import AllocatinRoutes from "./allocation-routes.js";
import DispatchRoutes from "./dispatch-routes.js";

const router = new Router();

router.use("/users", UserRoutes);
router.use("/roles", RoleRoutes);
router.use("/goods", GoodRoutes);
router.use("/categories", CategoryRoutes);
router.use("/warehouses", WarehouseRoutes);
router.use("/Allocations", AllocatinRoutes);
router.use("/dispatchs", DispatchRoutes);

export default router;
