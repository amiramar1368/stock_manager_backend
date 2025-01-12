import Good from "../model/good.js";
import Warehouse from "../model/warehouse.js";
import WarehouseStock from "../model/warehouse-stock.js";
import { Op } from "@sequelize/core";

export class WarehouseController {
  static async addWarehouse(req, res) {
    let { name } = req.body;
    if (name != undefined) {
      try {
        const warehouse = await Warehouse.create({
          name,
        });
        return res.sendSuccessResponse(201, warehouse.id);
      } catch (err) {
        res.sendError(err);
      }
    } else {
      return res.sendFailureResponse(400, "Not Name provided");
    }
  }

  static async getAllWarehouses(req, res) {
    let { page = 1, limit = 50, search = "" } = req.query;
    const offset = (page - 1) * limit;
    try {
      const warehouses = await Warehouse.findAll({
        where: { name: { [Op.like]: `%${search}%` } },
        offset,
      });
      return res.sendSuccessResponse(200, warehouses);
    } catch (err) {
      res.sendError(err);
    }
  }

  static async getRemainInWarehouse(req, res) {
    try {
      const records = await WarehouseStock.findAll({
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
