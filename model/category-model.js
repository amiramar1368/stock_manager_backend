import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: {
        msg: "good type must be unique",
      },
      set(value) {
        this.setDataValue("name", value.toUpperCase().trim());
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Category;
