import bcrypt from "bcryptjs";
import * as OTPAuth from "otpauth";

import User from "../model/user.js";
import Role from "../model/role.js";
import Permission from "../model/permission.js";
import RolePermission from "../model/role-permission.js";
import GoodType from "../model/good-type.js";
import Good from "../model/good.js";
import Warehouse from "../model/warehouse.js";
import WarehouseStock from "../model/warehouse-stock.js";

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
  const password = await bcrypt.hash("123", 10);
  await User.findOrCreate({
    where: {
      username: "admin",
    },
    defaults: {
      fullname: "admin",
      password,
      roleId: 1,
      secretKey: new OTPAuth.Secret({ size: 20 }).base32,
    },
  });
  await GoodType.findOrCreate({
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
      goodTypeId: 1,
    },
  });
  await Good.findOrCreate({
    where: {
      name: "Food2",
    },
    defaults: {
      createdBy: 1,
      goodTypeId: 1,
    },
  });
  await Warehouse.findOrCreate({
    where: {
      name: "Warehouse1",
    },
  });
  await WarehouseStock.findOrCreate({
    where: {
      goodId: 1,
    },
    defaults: {
      number: 65,
    },
  });
  await WarehouseStock.findOrCreate({
    where: {
      goodId: 2,
    },
    defaults: {
      number: 30,
    },
  });
}

export default insertTestRecord;
