import sequelize from "../utils/db.js";
import WarehouseAllocation from "../model/warehouse-allocation.js";
import Warehouse from "../model/warehouse.js";
import Good from "../model/good.js";
import User from "../model/user.js";
import GoodType from "../model/good-type.js";
import WarehouseStock from "../model/warehouse-stock.js";

export class WarehouseAllocationController {
  static async addWarehouseAllocation(req, res) {
    let { number, goodId, warehouseId, description } = req.body;
    if (number != undefined && goodId != undefined && warehouseId != undefined) {
      try {
        number = Math.abs(number);
        const user = await req.user;
        const warehouse = await Warehouse.findByPk(warehouseId);
        if (!warehouse) {
          return res.sendFailureResponse(404, "Warehouse Not Found" );
        }
        const good = await Good.findByPk(goodId);
        if (!good) {
          return res.sendFailureResponse(404,"Good Not Found" );
        }
        sequelize.transaction(async () => {
          try {
              await WarehouseAllocation.create({
            allocatorId: user.id,
            goodId,
            warehouseId,
            number: parseInt(number),
            description,
          });
          const isExistInWarehouse = await WarehouseStock.findOne({ where: { goodId } });
          if (isExistInWarehouse) {
            isExistInWarehouse.number += parseInt(number);
            await isExistInWarehouse.save();
          } else {
            await WarehouseStock.create({
              goodId,
              number: parseInt(number),
            });
          }
        return res.sendSuccessResponse(201);
          } catch (err) {
            res.sendError(err)
          }
        });
      } catch (err) {
        res.sendError(err);
      }
    } else {
      return res.sendFailureResponse( 400, "fill out all required fields" );
    }
  }

  static async getAllWarehouseAllocation(req, res) {
    try {
      const recordes = await WarehouseAllocation.findAll({
        include: [
          { model: User, attributes: ["id", "fullname"] },
          { model: Warehouse, attributes: ["id", "name"] },
          { model: Good, attributes: ["id", "name"], include: [GoodType] },
        ],
      });
      return res.sendSuccessResponse(202, recordes);
    } catch (err) {
      res.sendError(err);
    }
  }

}
