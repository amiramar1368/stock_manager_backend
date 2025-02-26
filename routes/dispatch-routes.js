import { Router } from "express";

import '../model/define-relation.js'
import { DispatchController } from "../controller/dispatch-controller.js";
import permission from '../middleware/permission.js';

const router = new Router();

router.route("/").get(permission(["fullAccess"]),DispatchController.getAllDispatchs).post(DispatchController.addDispatch);
router
  .route("/:id")
  .get(DispatchController.getDispatchById)
  .put(DispatchController.updateDispatch)
  .delete(DispatchController.deleteDispatch);

export default router;
