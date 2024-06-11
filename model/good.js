import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";
import User from "./user.js";
import GoodType from "./good-type.js";

const Good = sequelize.define(
  "good",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.trim());
      },
      unique: {
        msg: "name must be unique",
      },
      validate: {
        isLong(value) {
          if (value.length < 3) {
            throw new Error("name must be atleast 3 characters");
          } else if (value.length > 100) {
            throw new Error("name can not contain more than 100 characteres");
          }
        },
      },
    },
    goodTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

Good.belongsTo(User, {
  foreignKey: { name: "createdBy", onDelete: "NO ACTION", onUpdate: "CASCADE" },
  inverse: { type: "hasMany" },
});
Good.belongsTo(GoodType, {
  foreignKey: { name: "goodTypeId", onDelete: "NO ACTION", onUpdate: "CASCADE" },
  inverse: { type: "hasMany" },
});

export default Good;
