import { Router } from "express";

import { UserController } from "../controller/user-controller.js";
import permission from '../middleware/permission.js';

const router = new Router();

router
.route("/").get(permission(["fullAccess"]),UserController.getAllUsers)
.post(UserController.addUser);

router.get("/sign-out", UserController.logoutUser);
router.get("/qrcode-url", UserController.enable2FA);
router.put("/active2Fa", UserController.active2Fa);

router
  .route("/:id")
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

export default router;
