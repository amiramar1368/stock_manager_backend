import sequelize from "../utils/db.js";
import WarehouseDispatch from "../model/dispatch-model.js";
import Good from "../model/good-model.js";
import User from "../model/user-model.js";
import WarehouseStock from "../model/stock-model.js";

export class DispatchController {
  static async addDispatch(req, res) {
    let { number, goodId, recipient, description } = req.body;
    if (number != undefined && goodId != undefined && recipient != undefined) {
      try {
        const user = await req.user;
        const good = await Good.findByPk(goodId);
        if (!good) {
          return res.sendFailureResponse(404, "Good Not Found");
        }
        sequelize.transaction(async () => {
          try {
            const isExistInWarehouse = await WarehouseStock.findOne({
              where: { goodId },
            });
            if (
              isExistInWarehouse &&
              isExistInWarehouse.number >= parseInt(number)
            ) {
              await WarehouseDispatch.create({
                delivererId: user.id,
                goodId,
                recipient,
                number: parseInt(number),
                description,
              });
              isExistInWarehouse.number -= parseInt(number);
              await isExistInWarehouse.save();
            } else {
              return res.sendFailureResponse(
                404,
                "remain of this good is less than requested"
              );
            }
            return res.sendSuccessResponse(201);
          } catch (err) {
            res.sendError(err);
          }
        });
      } catch (err) {
        res.sendError(err);
      }
    } else {
      return res.sendFailureResponse(400, "fill out all required fields");
    }
  }

  static async getAllDispatchs(req, res) {
    let { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    try {
      const recordes = await WarehouseDispatch.findAll({
        include: [
          { model: User, attributes: ["id", "fullname"] },
          { model: Good, attributes: ["id", "name"] },
        ],
        offset,
      });
      return res.sendSuccessResponse(202, recordes);
    } catch (err) {
      res.sendError(err);
    }
  }

  static async getDispatchById(req,res){}

  static async updateDispatch(req,res){}

  static async deleteDispatch(req,res){}

}
