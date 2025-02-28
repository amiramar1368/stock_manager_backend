import sequelize from "../utils/db.js";
import Good from "../model/good-model.js";
import User from "../model/user-model.js";
import Stock from "../model/stock-model.js";
import InventoryLog from "../model/inventoryLog-model.js";
import { Op } from "@sequelize/core";

export class InventoryLogController {
  static async addInventorylog(req, res) {
    let { quantity, goodId, type, description } = req.body;
    try {
      const user = await req.user;
      const good = await Good.findByPk(+goodId);
      if (!good) return res.sendFailureResponse(404, "Good Not Found");
      const stock = await Stock.findOne({ where: { goodId: good.id } });
      await sequelize.transaction(async () => {
        await InventoryLog.create({
          type,
          quantity,
          description,
          userId: user.id,
          goodId: good.id,
        });
        if (type === "increase") {
          stock.number += +quantity;
          await stock.save();
        } else {
          if (stock.number >= +quantity) {
            stock.number -= +quantity;
            await stock.save();
          } else {
            return res.sendFailureResponse(
              404,
              "remain of this good is less than requested"
            );
          }
        }
        return res.sendSuccessResponse(201);
      });
    } catch (err) {
      res.sendError(err);
    }
  }

  static async getAllInventoryLogs(req, res) {
    let { page = 1, limit = 50, type = "", goodId, userId } = req.query;
    const offset = (page - 1) * limit;

    const conditions = {};
    if (goodId) {
      conditions.goodI = goodId;
    }
    if (userId) {
      conditions.userId = userId;
    }
    try {
      const inventoryLogs = await InventoryLog.findAll({
        where: { type: { [Op.like]: `%${type}%` }, ...conditions },
        include: [
          { model: User, attributes: ["id", "fullname"] },
          { model: Good, attributes: ["id", "name"] },
        ],
        offset,
      });
      return res.sendSuccessResponse(202, inventoryLogs);
    } catch (err) {
      res.sendError(err);
    }
  }

  static async getInventoryLogById(req, res) {}

  static async updateInventoryLog(req, res) {}

  static async deleteInventoryLog(req, res) {}
}

export class StockController {
  static async getRemainInWarehouse(req, res) {
    try {
      const records = await Stock.findAll({
        order: ["number"],
        limit: 10,
        include: [Good],
      });
      return res.sendSuccessResponse(200, records);
    } catch (err) {
      res.sendError(err);
    }
  }
}
