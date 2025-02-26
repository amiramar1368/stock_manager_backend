import Role from "../model/role-model.js";

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

  static async addRole(req,res){}

  static async getRoleById(req,res){}

  static async updateRole(req,res){}

  static async deleteRole(req,res){}
}
