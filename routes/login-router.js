import { Router } from "express";

import { UserController } from "../controller/user-controller.js";

const router = new Router();

router.get("/refresh-token", UserController.refreshAccessToken);
router.post("/login", UserController.loginUser);

export default router;
