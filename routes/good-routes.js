import { Router } from "express";

import "../model/define-relation.js";

import { GoodController } from "../controller/good-controller.js";

const router = new Router();

router
.route("/").get(GoodController.getAllGoods)
.post(GoodController.addGood);

router
  .route("/:id")
  .get(GoodController.getGoodById)
  .put(GoodController.updateGood)
  .delete(GoodController.deleteGood);

export default router;
