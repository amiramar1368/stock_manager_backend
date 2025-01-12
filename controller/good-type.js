import { Op } from "@sequelize/core";
import GoodType from "../model/good-type.js";

export class GoodTypeController {
  static async addGoodType(req, res) {
    const { name } = req.body;
    if (name != undefined) {
      try {
        const goodType = await GoodType.create({
          name,
        });
        return res.sendSuccessResponse(201, { goodTypeId: goodType.id });
      } catch (err) {
        res.sendError(err);
      }
    } else {
      return res.sendFailureResponse(400, "name is required");
    }
  }

  static async getAllGoodTypes(req, res) {
    let { page = 1, limit = 50, search = "" } = req.query;
    const offset = (page - 1) * limit;
    try {
      const goodTypes = await GoodType.findAll({
        where: { name: { [Op.like]: `%${search}%` } },
        offset,
      });
      return res.sendSuccessResponse(201, goodTypes, "all good type fetched");
    } catch (err) {
      res.sendError(err);
    }
  }
}
