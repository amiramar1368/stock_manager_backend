import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";
import Good from "./good.js";

export const WarehouseStock = sequelize.define(
  "warehouse_stock",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    goodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

WarehouseStock.belongsTo(Good, {
  foreignKey: { name: "goodId", onDelete: "NO ACTION", onUpdate: "CASCADE" },
  inverse: { type: "hasMany" },
});
export default WarehouseStock;
