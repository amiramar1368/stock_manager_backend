import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";
import Good  from "./good.js";
import  Warehouse  from "./warehouse.js";
import  User  from "./user.js";

export const WarehouseAllocation = sequelize.define(
  "Warehouse_allocation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    allocatorId: {
      type: DataTypes.INTEGER,
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
    warehouseId: {
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


WarehouseAllocation.belongsTo(User, {
  foreignKey: { name: "allocatorId", onDelete: "NO ACTION", onUpdate: "CASCADE" },
  inverse: { type: "hasMany" },
});

WarehouseAllocation.belongsTo(Warehouse, {
  foreignKey: { name: "warehouseId", onDelete: "NO ACTION", onUpdate: "CASCADE" },
  inverse: { type: "hasMany" },
});

WarehouseAllocation.belongsTo(Good, {
  foreignKey: { name: "goodId", onDelete: "NO ACTION", onUpdate: "CASCADE" },
  inverse: { type: "hasMany" },
});
export default WarehouseAllocation;