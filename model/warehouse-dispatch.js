import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";
import Good from "./good.js";
import User from "./user.js";

export const WarehouseDispatche = sequelize.define(
  "Warehouse_dispatch",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    delivererId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      defaultValue: "",
      set(value) {
        this.setDataValue("description", value.trim());
      },
      validate: {
        isLong(value) {
          if (value.length > 1000) {
            throw new Error("description can not be more than 1000 characteres");
          }
        },
      },
    },
  },
  {}
);

WarehouseDispatche.belongsTo(User, {
  foreignKey: { name: "delivererId", onDelete: "NO ACTION", onUpdate: "CASCADE" },
  inverse: { type: "hasMany" },
});

WarehouseDispatche.belongsTo(Good, {
  foreignKey: { name: "goodId", onDelete: "NO ACTION", onUpdate: "CASCADE" },
  inverse: { type: "hasMany" },
});

export default WarehouseDispatche;
