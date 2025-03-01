import Role from "../model/role-model.js";
import User from "../model/user-model.js";
import sequelize from "../utils/db.js";

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

  static async addRole(req, res) {
    const name = req.body.name;
    try {
      const role = await Role.create({
        name
      });
      res.sendSuccessResponse(201, role, "role add successfully")
    } catch (err) {
      res.sendError(err)
    }
  }

  static async getRoleById(req, res) {
    const id = +req.params.id;
    try {
      const role = await Role.findByPk(id);
      if (!role) return res.sendFailureResponse(404, "role not found");
      res.sendSuccessResponse(200, role, "fetch successfully")
    } catch (err) {
      res, sendError(err)
    }
  }

  static async updateRole(req, res) {
    const id = + req.params.id;
    const name = req.body.name;
    try {
      const role = await Role.findByPk(id);
      if (!role) return res.sendFailureResponse(404, "role not found");
      await role.update({
        name
      });
      res.sendSuccessResponse(200, null, "update successfully")
    } catch (err) {
      res.sendError(err)
    }
  }

  static async deleteRole(req, res) { 
    const id = +req.params.id;
    const force = req.query.force;
    try {
      const role = await Role.findByPk(id);
      if(!role) return res.sendFailureResponse(404,"role not found")
      const user= await User.findOne({where:{
        roleId:id
      }});
      if(!user || (user && force==="true")){
        await sequelize.transaction(async()=>{
          await User.destroy({where:{roleId:id}});
          await Role.destroy({where:{id}})
        });
        res.sendSuccessResponse(200,null,"delete seccessfully")
      }else{
        res.sendFailureResponse(400,"this role has some user associated to it and can not remove it")
      }
    } catch (err) {
      res.sendError(err)
    }
  }
}
