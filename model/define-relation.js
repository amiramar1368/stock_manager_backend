import User from "./user-model.js";
import Role from "./role-model.js";
import Permission from "./permission-model.js";
import RolePermission from "./role-permission-model.js";
import Good from "./good-model.js";
import Category from "./category-model.js";
import Stock from "./stock-model.js";
import RefreshToken from "./refresh-token-model.js";
import InventoryLog from "./inventoryLog-model.js";

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

User.hasMany(InventoryLog, {
  foreignKey: {
    allowNull: false,
    validate: { notNull: { msg: "userId can not be null" } },
  },
});
Good.hasMany(InventoryLog, {
  foreignKey: {
    allowNull: false,
    validate: { notNull: { msg: "goodId can not be null" } },
  },
});

Category.hasMany(Good, {
  foreignKey: {
    allowNull: false,
    validate: { notNull: { msg: "categoryId can not be null" } },
  },
});

Good.hasOne(Stock, {
  foreignKey: {
    unique:true,
    allowNull: false,
    validate: { notNull: { msg: "goodId can not be null" } },
  },
});

User.hasOne(RefreshToken, { foreignKey: { allowNull: false, unique: true } });
