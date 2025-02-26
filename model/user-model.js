import { DataTypes } from "@sequelize/core";
import bcrypt from 'bcryptjs'

import sequelize from "../utils/db.js";
// import Role from "./role.js";

export const User = sequelize.define(
  "user",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if (value) {
          this.setDataValue("fullname", String(value).trim());
        }
      },
      validate: {
        notNull: {
          msg: "fullname can not be null",
        },
        isShort(value) {
          if (value.length < 3) {
            throw new Error("fullname must be more than 3 characteres");
          }
        },
        isLong(value) {
          if (value.length > 100) {
            throw new Error("fullname must be less than 100 characteres");
          }
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if (value) {
          this.setDataValue("username", String(value).trim());
        }
      },
      validate: {
        notNull: {
          msg: "username can not be null",
        },
        isShort(value) {
          if (value.length < 3) {
            throw new Error("username must be more than 3 characteres");
          }
        },
        isLong(value) {
          if (value.length > 100) {
            throw new Error("username must be less than 100 characteres");
          }
        },
      },
      unique: {
        msg: "username must be unique",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue("password",bcrypt.hashSync(String(value).trim(),10))
      },
      validate:{
        notNull:{
          msg:"password can not be null"
        },
        isShort(value){
          if(value.length<5){
            throw new Error("password must be more than 5 characters")
          }
        }
      }
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
  {timestamps:false}
);

// User.belongsTo(Role, {
//   foreignKey: { name: "roleId", onDelete: "NO ACTION", onUpdate: "CASCADE" },
//   inverse: { type: "hasMany" },
// });

export default User;
