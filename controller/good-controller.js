import sequelize from "../utils/db.js";
import { Op } from "@sequelize/core";
import GoodType from "../model/category-model.js";
import Good from "../model/good-model.js";
import Stock from "../model/stock-model.js";

export class GoodController {
  static async addGood(req, res) {
    const user = req.user;
    let { categoryId, name } = req.body;
    console.log(req.body)
      try {
        const category = await GoodType.findByPk(categoryId);
        if (!category) {
          return res.sendFailureResponse(404, "category not found");
        }
        sequelize.transaction(async () => {
          const good = await Good.create({
            createdBy: user.id,
            categoryId,
            name,
          });
          await Stock.create({
            goodId:good.id,
            number:0
          })
          return res.sendSuccessResponse(201, { goodId: good.id });
        });
      } catch (err) {
        res.sendError(err);
      }
   
  }

  static async getAllGoods(req, res) {
    let { page = 1, limit = 50, search = "" } = req.query;
    const offset = (page - 1) * limit;
    try {
      const goods = await Good.findAll({
        attributes: ["id", "name"],
        include: [GoodType],
        where: { name: { [Op.like]: `%${search}%` } },
        offset,
      });

      return res.sendSuccessResponse(200, goods);
    } catch (err) {
      return res.sendError(err);
    }
  }

  static async updateGood(req, res) {}

  static async deleteGood(req, res) {}

  static async getGoodById(req, res) {}
}
