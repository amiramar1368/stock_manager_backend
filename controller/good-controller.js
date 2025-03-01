import sequelize from "../utils/db.js";
import { Op } from "@sequelize/core";
import GoodType from "../model/category-model.js";
import Good from "../model/good-model.js";
import Stock from "../model/stock-model.js";
import Category from "../model/category-model.js";
import InventoryLog from "../model/inventoryLog-model.js";

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
          goodId: good.id,
          number: 0
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

  static async getGoodById(req, res) {
    const id = +req.params.id;
    try {
      const good = await Good.findByPk(id, {
        include: [Category],
        attributes: ["id", "name"]
      });
      if (!good) return res.sendFailureResponse(404, "good not found");
      res.sendSuccessResponse(200, good, "good fetch successfully")
    } catch (err) {
      res.sendError(err)
    }
  }

  static async updateGood(req, res) {
    const id = +req.params.id;
    const { name, categoryId } = req.body;
    try {
      const good = await Good.findByPk(id);
      if (!good) return res.sendFailureResponse(404, "good not found");
      await good.update({
        name,
        categoryId
      });
      res.sendSuccessResponse(202, null, "good update successfully")
    } catch (err) {
      res.sendError(err)
    }
  }

  static async deleteGood(req, res) {
    const id = + req.params.id;
    const force = req.query.force;
    try {
      const good = await Good.findByPk(id);
      if (!good) return res.sendFailureResponse(404, "good not found");
      const inventoryLog = await InventoryLog.findOne({ where: { goodId: id } });
      if (!inventoryLog || (inventoryLog && force === "true")) {
        await sequelize.transaction(async () => {
          await InventoryLog.destroy({ where: { goodId: id } });
          await Good.destroy({ where: { id } })
        })
        res.sendSuccessResponse(200,null,"delete successfully")
      } else {
        res.sendFailureResponse(400, "this good has some record in inventory table and can not remove it")
      }
    } catch (err) {
      res.sendError(err)
    }
  }

}
