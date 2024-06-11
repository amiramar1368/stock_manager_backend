import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";
import Role from "./role.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("fullname", value.trim());
      },
      validate: {
        isShort(value) {
          if (value.length < 3) {
            throw new Error("fullname must be atleast 3 characteres");
          } else if (value.length > 100) {
            throw new Error("fullname cant be more than 100 characteres");
          }
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("username", value.trim());
      },
      validate: {
        isShort(value) {
          if (value.length < 3) {
            throw new Error("username must be atleast 3 characteres");
          } else if (value.length > 20) {
            throw new Error("username cant be more than 20 characteres");
          }
        },
      },
      unique: {
        msg: "username must be unique",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secretKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_2FA_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {}
);

User.belongsTo(Role, {
  foreignKey: { name: "roleId", onDelete: "NO ACTION", onUpdate: "CASCADE" },
  inverse: { type: "hasMany" },
});

export default User;
