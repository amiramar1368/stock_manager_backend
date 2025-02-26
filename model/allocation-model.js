import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";

export const Allocation = sequelize.define(
  "allocation",
  {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      set(value) {
        if (value) {
          if (!Number.isInteger(Number(value))) {
            throw new Error("number must be an Integer")
          }
        }
      },
      validate: {
        notNull: {
          msg: "number can not be null",
        },
        max: {
          args: 1000,
          msg: "number must be less than 1000",
        },
        min: {
          args: 1,
          msg: "nember must be more than 1",
        },
      },
    },
    description: {
      type: DataTypes.STRING(1000),
      defaultValue: "",
      set(value) {
        if(value){
          this.setDataValue("description", String(value).trim());
        }
      },
      validate: {
        isLong(value) {
          if (value.length > 1000) {
            throw new Error(
              "description can not be more than 1000 characteres"
            );
          }
        },
      },
    },
  },
  {}
);

export default Allocation;
