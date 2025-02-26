import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

export const RolePermission = sequelize.define(
  "role_permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        type: "unique",
        fields: ["roleId", "permissionId"],
        msg: "role can not have repeat permission",
      },
    ],
  }
);

export default RolePermission;
