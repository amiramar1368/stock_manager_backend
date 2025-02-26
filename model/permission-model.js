import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

export const Permission = sequelize.define(
  "permission",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value) {
        if (value) {
          this.setDataValue("name", String(value).trim());
        }
      },
      unique: {
        name: "permission_idx",
        msg: "permission must be unique",
      },
      validate: {
        notNull: {
          msg: "permission can not be null",
        },
        isLong(value) {
          if (value.length > 100) {
            throw new Error("permission can not be more than 100 characters");
          }
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Permission;
