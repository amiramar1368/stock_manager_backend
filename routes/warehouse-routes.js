import { Router } from "express";

import '../model/define-relation.js'
import { WarehouseController } from "../controller/warehouse-controller.js";
import permission from '../middleware/permission.js';

const router = new Router();

router.route("/").get(permission(["fullAccess"]),WarehouseController.getAllWarehouses).post(WarehouseController.addWarehouse);

router
  .route("/:id")
  .get(WarehouseController.getWarehouseById)
  .put(WarehouseController.updateWarehouse)
  .delete(WarehouseController.deleteWarehouse);

export default router;
