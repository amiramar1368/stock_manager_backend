import { Op } from "@sequelize/core";
import Category from "../model/category-model.js";

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

  static async getCategoryById(req,res){}

  static async updateCategory(req,res){}

  static async deleteCategory(req,res){}
}
