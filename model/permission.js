import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

export const Permission = sequelize.define(
  "permission",
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
        name: "permission_idx",
        msg: "permission must be unique",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Permission;
