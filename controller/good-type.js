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

  static async getAllGoodType(req, res) {
    try {
      const goodTypes = await GoodType.findAll();
      return res.sendSuccessResponse(201, goodTypes, "all good type fetched");
    } catch (err) {
      res.sendError(err);
    }
  }
}
