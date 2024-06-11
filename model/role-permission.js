import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

export const RolePermission = sequelize.define(
  "role_permission",
  {
    id: {
      type: DataTypes.TINYINT,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default RolePermission;
