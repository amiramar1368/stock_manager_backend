import Role from "../model/role.js";

export class RoleController {
  static async getAllRole(req, res) {
    try {
      const roles = await Role.findAll();
      setTimeout(() => {
        return res.sendSuccessResponse(200, roles);
      }, 2000);
    } catch (err) {
      res.sendError(err);
    }
  }
}
