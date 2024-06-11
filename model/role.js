import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";
import Permission from "./permission.js";
import RolePermission from "./role-permission.js";

export const Role = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        name: "role_idx",
        msg: "role must be unique",
      },
    },
  },
  {
    timestamps: false,
  }
);

Role.belongsToMany(Permission, { as: 'permissions', through: RolePermission, inverse: { as: 'roles' } });

export default Role;
