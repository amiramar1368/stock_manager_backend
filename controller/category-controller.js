import { Op } from "@sequelize/core";
import Category from "../model/category-model.js";
import Good from "../model/good-model.js";
import sequelize from "../utils/db.js";

export class CategoryController {
  
  static async addCategory(req, res) {
    const { name } = req.body;
    if (name != undefined) {
      try {
        const category = await Category.create({
          name,
        });
        return res.sendSuccessResponse(201, { categoryId: category.id });
      } catch (err) {
        res.sendError(err);
      }
    } else {
      return res.sendFailureResponse(400, "name is required");
    }
  }

  static async getCategories(req, res) {
    let { page = 1, limit = 50, search = "" } = req.query;
    const offset = (page - 1) * limit;
    try {
      const categories = await Category.findAll({
        where: { name: { [Op.like]: `%${search}%` } },
        offset,
      });
      return res.sendSuccessResponse(201, categories, "all categories fetched");
    } catch (err) {
      res.sendError(err);
    }
  }

  static async getCategoryById(req, res) {
    const id = +req.params.id;
    try {
      const category = await Category.findByPk(id);
      if (category) {
        return res.sendSuccessResponse(201, category, "category fetched successfully");
      } else {
        return res.sendFailureResponse(404, "category not found");
      }
    } catch (err) {
      res.sendError(err);
    }
  }

  static async updateCategory(req, res) {
    const id = +req.params.id;
    const name = req.body.name;
    try {
      const category = await Category.findByPk(id);
      if (!category) return res.sendFailureResponse(404, "category not found");
      category.update({
        name
      })
      return res.sendSuccessResponse(201, null, "category updated successfully");
    } catch (err) {
      res.sendError(err)
    }
  }

  static async deleteCategory(req, res) {
    const id = + req.params.id;
    try {
      const category = await Category.findByPk(id);
      if(!category) return res.sendFailureResponse(404,"category not found")
    } catch (err) {
      
    }
    const force = req.query.force;
    const good = await Good.findOne({ where: { categoryId: id } });
    if (!good || (good && force === "true")) {
      await sequelize.transaction(async () => {
        await Good.destroy({ where: { categoryId: id } });
        await Category.destroy({ where: { id } });
        return res.sendSuccessResponse(202, null, "category and its good delete successfully");
      })
    } else {
      res.sendFailureResponse(400, "this category has some good and you cant remove it")
    }

  }
}
