import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

export const Stock = sequelize.define(
  "stock",
  {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Stock;
