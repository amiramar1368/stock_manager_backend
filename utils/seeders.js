import * as OTPAuth from "otpauth";

import User from "../model/user-model.js";
import Role from "../model/role-model.js";
import Permission from "../model/permission-model.js";
import RolePermission from "../model/role-permission-model.js";
import Category from "../model/category-model.js";
import Good from "../model/good-model.js";

async function insertTestRecord() {
  await Role.findOrCreate({
    where: { name: "admin" },
  });
  await Permission.findOrCreate({
    where: { name: "fullAccess" },
  });
  await RolePermission.findOrCreate({
    where: {
      roleId: 1,
      permissionId: 1,
    },
  });
  await User.findOrCreate({
    where: {
      username: "admin",
    },
    defaults: {
      fullname: "admin",
      password:"123",
      roleId: 1,
      secretKey: new OTPAuth.Secret({ size: 20 }).base32,
    },
  });
  await Category.findOrCreate({
    where: {
      name: "Food",
    },
  });
  await Good.findOrCreate({
    where: {
      name: "Food1",
    },
    defaults: {
      createdBy: 1,
      categoryId: 1,
    },
  });
  await Good.findOrCreate({
    where: {
      name: "Food2",
    },
    defaults: {
      createdBy: 1,
      categoryId: 1,
    },
  });
}

export default insertTestRecord;
