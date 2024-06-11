import Good from "../model/good.js";
import Warehouse from "../model/warehouse.js";
import WarehouseStock from "../model/warehouse-stock.js";

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

  static async getAllWarehouse(req, res) {
    try {
      const warehouses = await Warehouse.findAll();
      return res.sendSuccessResponse(200, warehouses);
    } catch (err) {
      res.sendError(err);
    }
  }
  
  static async getRemainInWarehouse(req, res) {
    try {
      const records = await WarehouseStock.findAll({ order: ["number"], limit: 10, include: [Good] });
      return res.sendSuccessResponse(200, records);
    } catch (err) {
      res.sendError(err);
    }
  }
}
