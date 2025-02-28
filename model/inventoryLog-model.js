import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

export const InventoryLog = sequelize.define(
  "inventory_log",
  {
    quantity: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      set(value) {
        if (value && value === parseInt(value)) {
          this.setDataValue("quantity", value);
        }
      },
      validate: {
        notNull: {
          msg: "quantity can not be null",
        },
        isValid(value) {
          if (value > 65000) {
            throw new Error("quantity must be less than 65000");
          } else if (value < 1) {
            throw new Error("quantity must be more than 1");
          }
        },
      },
    },
    type: {
      type: DataTypes.ENUM("increase", "decrease"),
      allowNull: false,
      defaultValue: "increase",
      validate: {
        isValid(value) {
          if (!["increase", "decrease"].includes(value)) {
            throw new Error("type only can be 'increase' or 'decrease' ");
          }
        },
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(),
    },
    description: {
      type: DataTypes.STRING(1000),
      defaultValue: "",
      set(value) {
        if (value) {
          this.setDataValue("description", String(value).trim());
        }
      },
      validate: {
        isLong(value) {
          if (value.length > 1000) {
            throw new Error(
              "description can not be more than 1000 characteres"
            );
          }
        },
      },
    },
  },
  {}
);

export default InventoryLog;
