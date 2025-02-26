import User from "./user-model.js";
import Role from "./role-model.js";
import Permission from "./permission-model.js";
import RolePermission from "./role-permission-model.js";
import Good from "./good-model.js";
import Category from "./category-model.js";
import Allocatin from "./allocation-model.js";
import Warehouse from "./warehouse-model.js";
import Dispatch from "./dispatch-model.js";
import Stock from "./stock-model.js";
import RefreshToken from "./refresh-token-model.js";

Role.hasMany(User, {
  foreignKey: {
    allowNull: false,
    validate: { notNull: { msg: "roleId can not be null" } },
  },
});

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: {
    allowNull: false,
    validate: { notNull: { msg: "roleId can not be null" } },
  },
  otherKey: {
    allowNull: false,
    validate: { notNull: { msg: "permissinId can not be null" } },
  },
});

User.hasMany(Good, {
  foreignKey: {
    name: "createdBy",
    allowNull: false,
    validate: { notNull: { msg: "userId can not be null" } },
  },
});
User.hasMany(Allocatin, {
  foreignKey: {
    name: "allocatorId",
    allowNull: false,
    validate: { notNull: { msg: "allocatorId can not be null" } },
  },
});
Good.hasMany(Allocatin, {
  foreignKey: {
    allowNull: false,
    validate: { notNull: "goodId can not be null" },
  },
});

Category.hasMany(Good, {
  foreignKey: {
    allowNull: false,
    validate: { notNull: { msg: "categoryId can not be null" } },
  },
});

Warehouse.hasMany(Allocatin, {
  foreignKey: {
    allowNull: false,
    validate: { notNull: { msg: "warehouseId can not be null" } },
  },
});
Good.hasMany(Dispatch, {
  foreignKey: {
    allowNull: false,
    validate: { notNull: { msg: "goodId can not be null" } },
  },
});
User.hasMany(Dispatch, {
  foreignKey: {
    name: "delivererId",
    allowNull: false,
    validate: { notNull: { msg: "delivererId can not be null" } },
  },
});

Good.hasMany(Stock, {
  foreignKey: {
    allowNull: false,
    validate: { notNull: { msg: "goodId can not be null" } },
  },
});

User.hasOne(RefreshToken,{foreignKey:{allowNull:false,unique:true}})
