import { Router } from "express";

import '../model/define-relation.js'
import { RoleController } from "../controller/role-controller.js";
import permission from '../middleware/permission.js';

const router = new Router();

router.route("/").get(permission(["fullAccess"]),RoleController.getAllRole).post(RoleController.addRole);
router
  .route("/:id")
  .get(RoleController.getRoleById)
  .put(RoleController.updateRole)
  .delete(RoleController.deleteRole);

export default router;
