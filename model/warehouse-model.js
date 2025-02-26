import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

export const Warehouse = sequelize.define(
  "warehouse",
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
        msg: "name  must be unique",
      },
      validate: {
        notNull: {
          msg: "name can not be null",
        },
        isShort(value) {
          if (value.length < 3) {
            throw new Error(
              "name must be more than 3 characteres"
            );
          }
        },
        isLong(value) {
          if (value.length > 100) {
            throw new Error(
              "name must be less than 100 characteres"
            );
          }
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Warehouse;
