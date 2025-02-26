import { Router } from "express";

import "../model/define-relation.js";
import { AllocationController } from "../controller/allocation-controller.js";
import permission from "../middleware/permission.js";

const router = new Router();

router
  .route("/")
  .get(permission(["fullAccess"]), AllocationController.getAllAllocations)
  .post(AllocationController.addAllocation);
router
  .route("/:id")
  .get(AllocationController.getAllcationById)
  .put(AllocationController.updateAllocation)
  .delete(AllocationController.deleteAllocation);

export default router;
