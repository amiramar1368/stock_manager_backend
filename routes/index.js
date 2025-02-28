import { Router } from "express";

import "../model/define-relation.js";
import UserRoutes from "./user-routes.js";
import RoleRoutes from "./role-routes.js";
import GoodRoutes from "./good-routes.js";
import CategoryRoutes from "./category-routes.js";
import InventoryLogRoutes from "./inventory-routes.js";
import { StockController } from "../controller/inventoryLog-controller.js";

const router = new Router();

router.use("/users", UserRoutes);
router.use("/roles", RoleRoutes);
router.use("/goods", GoodRoutes);
router.use("/categories", CategoryRoutes);
router.use("/inventory-logs", InventoryLogRoutes);
router.get("/stock", StockController.getRemainInWarehouse);

export default router;
