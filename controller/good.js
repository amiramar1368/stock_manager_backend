import { Op } from "@sequelize/core";
import GoodType from "../model/good-type.js";
import Good from "../model/good.js";

export class GoodController {
  static async addGood(req, res) {
    const user = req.user;
    let { name, goodTypeId } = req.body;
    if (name != undefined && goodTypeId != undefined) {
      try {
        const goodType = await GoodType.findByPk(goodTypeId);
        if (!goodType) {
          return res.sendFailureResponse(404, "goodType not found");
        }
        const good = await Good.create({
          createdBy: user.id,
          goodTypeId,
          name,
        });
        return res.sendSuccessResponse(201, { goodId: good.id });
      } catch (err) {
        res.sendError(err);
      }
    } else {
      return res.sendFailureResponse(400, "not name and goodtype provided");
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
      return res.sendError(err)
    }
  }
}
