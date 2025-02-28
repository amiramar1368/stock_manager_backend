import { Router } from "express";

import "../model/define-relation.js";

import { InventoryLogController } from "../controller/inventoryLog-controller.js";

const router = new Router();

router
.route("/").get(InventoryLogController.getAllInventoryLogs)
.post(InventoryLogController.addInventorylog);

router
  .route("/:id")
  .get(InventoryLogController.getInventoryLogById)
  .put(InventoryLogController.updateInventoryLog)
  .delete(InventoryLogController.deleteInventoryLog);

export default router;
