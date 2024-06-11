import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

export const Warehouse = sequelize.define(
  "warehouse",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.trim());
      },
      unique: {
        msg: "name of warehouse must be unique",
      },
      validate: {
        isShort(value) {
          if (value.length < 3) {
            throw new Error("name of warehouse must be atleast 3 characteres");
          } else if (value.length > 100) {
            throw new Error("name of warehouse cant be more than 50 characteres");
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
