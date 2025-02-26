import { DataTypes } from "@sequelize/core";
import { v4 as uuid } from "uuid";

import sequelize from "../utils/db.js";
import User from "./user-model.js";
import {REFRESH_TOKEN_EXPIRATION } from "../config.js";

export const RefreshToken = sequelize.define(
  "refresh_token",
  {
    token: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    expire_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false, noPrimaryKey: true }
);

RefreshToken.createToken = (userId) => {
  const d = new Date();
  const expire_at = d.setMinutes(d.getMinutes() + Number(REFRESH_TOKEN_EXPIRATION));
  const token = uuid();
  RefreshToken.create({
    userId,
    token,
    expire_at,
  });
  return token
};

RefreshToken.isValid = (record) => {
  return record.expire_at > new Date();
};
export default RefreshToken;
