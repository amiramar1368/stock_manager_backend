import { Router } from "express";

import { RoleController } from "../controller/role.js";
import { UserController } from "../controller/user.js";
import { WarehouseController } from "../controller/warehouse.js";
import { GoodTypeController } from "../controller/good-type.js";
import { GoodController } from "../controller/good.js";
import { WarehouseAllocationController } from "../controller/warehouse-allocation.js";
import { WarehouseDispatchController } from "../controller/warehouse-dispatch.js";
import permission from '../middleware/permission.js';

const router = new Router();

router.route("/users").get(permission(["fullAccess"]),UserController.getAllUser).post(UserController.addUser);
router.get("/users/sign-out", UserController.logoutUser);
router.get("/users/qrcode-url", UserController.enable2FA);
router.put("/users/active2Fa", UserController.active2Fa);
router
  .route("/users/:id")
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

router.get("/roles", RoleController.getAllRole);

router.route("/warehouses").get(WarehouseController.getAllWarehouse).post(WarehouseController.addWarehouse);

router.get("/remain-stock", WarehouseController.getRemainInWarehouse);

router.route("/good-types").get(GoodTypeController.getAllGoodType).post(GoodTypeController.addGoodType);

router.route("/goods").get(GoodController.getAllGood).post(GoodController.addGood);

router
  .route("/warehouse-Allocation")
  .get(WarehouseAllocationController.getAllWarehouseAllocation)
  .post(WarehouseAllocationController.addWarehouseAllocation);

router
  .route("/warehouse-dispatch")
  .get(WarehouseDispatchController.getAllWarehouseDispatch)
  .post(WarehouseDispatchController.addWarehouseDispatch);

export default router;
