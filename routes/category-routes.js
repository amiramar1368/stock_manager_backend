import { Router } from "express";

import '../model/define-relation.js'
import { CategoryController } from "../controller/category-controller.js";
import permission from '../middleware/permission.js'

const router = new Router();

router.route("/").get(permission(["fullAccess"]),CategoryController.getCategories).post(CategoryController.addCategory);
router
  .route("/:id")
  .get(CategoryController.getCategoryById)
  .put(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

export default router;
