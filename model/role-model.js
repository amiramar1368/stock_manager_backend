import { DataTypes } from "@sequelize/core";

import sequelize from "../utils/db.js";
// import Permission from "./permission.js";
// import RolePermission from "./role-permission.js";

export const Role = sequelize.define(
  "role",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value) {
        if (value) {
          this.setDataValue("name", String(value).trim());
        }
      },
      unique: {
        name: "role_idx",
        msg: "role must be unique",
      },
      validate: {
        isLong(value) {
          if (value.length > 100) {
            throw new Error("role can not be more than 100 characters");
          }
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

// Role.belongsToMany(Permission, {
//   as: "permissions",
//   through: RolePermission,
//   inverse: { as: "roles" },
// });

export default Role;
