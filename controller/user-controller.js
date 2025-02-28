import bcrypt from "bcryptjs";
import * as OTPAuth from "otpauth";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

import { Role } from "../model/role-model.js";
import { Permission } from "../model/permission-model.js";
import { User } from "../model/user-model.js";
import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXPIRATION } from "../config.js";
import RefreshToken from "../model/refresh-token-model.js";
import { Op } from "@sequelize/core";

export class UserController {
  static async loginUser(req, res) {
    const { username, password, token } = req.body;
    if (username !== undefined && password !== undefined) {
      try {
        const { user, permissions } = await getUserDetailes(username);
        if (!user) {
          return res.sendFailureResponse(404, "User Not Found");
        } else {
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) {
            const userInfo = {
              id: user.id,
              fullname: user.fullname,
              is_2FA_active: user.is_2FA_active,
              permissions,
            };
            if (!user.is_2FA_active) {
              const accessToken = jwt.sign(userInfo, ACCESS_TOKEN_KEY, {
                expiresIn: `${ACCESS_TOKEN_EXPIRATION}m`,
              });

              await RefreshToken.destroy({ where: { userId: user.id } });
              const refreshToken = await RefreshToken.createToken(user.id);

              const userDetails = { ...userInfo, accessToken, refreshToken };
              req.user = userDetails;
              return res.sendSuccessResponse(
                200,
                { user: userDetails },
                "success login"
              );
            } else {
              let totp = new OTPAuth.TOTP({
                issuer: "Stock Manager",
                label: user.username,
                algorithm: "SHA1",
                digits: 6,
                secret: user.secretKey,
              });
              // let seconds = totp.period - (Math.floor(Date.now() / 1000) % totp.period);
              let delta = totp.validate({ token, window: 1 });
              if (delta !== null && delta !== -1) {
                const accessToken = jwt.sign(userInfo, ACCESS_TOKEN_KEY, {
                  expiresIn: `${ACCESS_TOKEN_EXPIRATION}s`,
                });

                await RefreshToken.destroy({ where: { userId: user.id } });
                const refreshToken = await RefreshToken.createToken(user.id);

                const userDetails = { ...userInfo, accessToken, refreshToken };
                req.user = userDetails;
                res.sendSuccessResponse(
                  200,
                  { user: userDetails },
                  "success login"
                );
              } else {
                return res.sendFailureResponse(
                  500,
                  "Error while generating QR Code"
                );
              }
            }
          } else {
            return res.sendFailureResponse(
              401,
              "username or password is wrong"
            );
          }
        }
      } catch (err) {
        res.sendError(err);
      }
    } else {
      return res.sendFailureResponse(
        401,
        "username and password are required!"
      );
    }
  }

  static async enable2FA(req, res) {
    let totp = new OTPAuth.TOTP({
      issuer: "Stock Manager",
      label: req.user.username,
      algorithm: "SHA1",
      digits: 6,
      secret: req.user.secretKey,
    });
    let otpauth_url = totp.toString();
    QRCode.toDataURL(otpauth_url, (err, qrCodeUrl) => {
      if (err) {
        return res.sendFailureResponse(500, "Error while generating QR Code");
      }
      return res.sendSuccessResponse(200, { qrCodeUrl });
    });
  }

  static async refreshAccessToken(req, res) {
    try {
      let { refreshToken } = req.query;
      if (!refreshToken) {
        return res.sendFailureResponse(403, "no token provided");
      }
      const record = await RefreshToken.findOne({
        where: { token: refreshToken },
      });
      if (!record) {
        return res.sendFailureResponse(403, "invalid token");
      }
      if (!RefreshToken.isValid(record)) {
        return res.sendFailureResponse(403, "invalid token");
      }
      const { user, permissions } = await getUserDetailes(record.userId);
      const userInfo = { id: user.id, fullname: user.fullname, permissions };
      const accessToken = jwt.sign(userInfo, ACCESS_TOKEN_KEY, {
        expiresIn: `${ACCESS_TOKEN_EXPIRATION}m`,
      });

      await RefreshToken.destroy({ where: { userId: record.userId } });
      const newRefreshToken = await RefreshToken.createToken(user.id);
      return res.sendSuccessResponse(202, {
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      res.sendError(err);
    }
  }

  static async logoutUser(req, res) {
    try {
      await RefreshToken.destroy({ where: { userId: req.user.id } });
      res.sendSuccessResponse(200, null, "sign-out successfully");
    } catch (err) {
      res.sendError(err);
    }
  }

  static async active2Fa(req, res) {
    try {
      const user = req.user;
      const record = await User.findByPk(user.id);
      await record.update({ is_2FA_active: true });
      res.sendSuccessResponse(200, "active 2FA auth successfully");
    } catch (err) {
      res.sendError(err);
    }
  }

  static async addUser(req, res) {
    let { username, fullname, roleId, password } = req.body;
    try {
      const newUser = await User.create({
        username,
        fullname,
        roleId,
        password,
        secretKey: new OTPAuth.Secret({ size: 20 }).base32,
      });
      return res.sendSuccessResponse(201, { id: newUser.id });
    } catch (err) {
      res.sendError(err);
    }
  }

  static async getAllUsers(req, res) {
    try {
      let { page = 1, limit = 10, search = "" } = req.query;
      const offset = (page - 1) * limit;
      const users = await User.findAll({
        where: { fullname: { [Op.like]: `%${search}%` } },
        limit,
        offset,
        attributes: ["id", "fullname", "username"],
        include: Role,
      });
      return res.sendSuccessResponse(200, users);
    } catch (err) {
      return res.sendError(err);
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "fullname", "username"],
        include: [Role],
      });
      if (user) {
        return res.sendSuccessResponse(200, user);
      } else {
        return res.sendFailureResponse(404, "User Not Found");
      }
    } catch (err) {
      res.sendError(err);
    }
  }

  static async updateUser(req, res) {
    let { fullname, roleId, username, password } = req.body;
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        user.update({
          fullname,
          roleId,
          username,
          password,
        });
        return res.sendSuccessResponse(201);
      } else {
        return res.sendFailureResponse(404, "User Not Found");
      }
    } catch (err) {
      return res.sendError(err);
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        return res.sendSuccessResponse(202);
      } else {
        return res.sendFailureResponse(404, "User Not Found");
      }
    } catch (err) {
      res.sendError(err);
    }
  }
}

async function getUserDetailes(condition) {
  let property = "id";
  if (typeof condition === "string") {
    property = "username";
  }
  const user = await User.findOne({
    where: { [property]: condition },
    include: {
      model: Role,
      include: { model: Permission, through: { attributes: [] } },
    },
  });
  if (user) {
    const permissions = [];
    const userPermissions = user.role.permissions;
    for (let i = 0; i < userPermissions.length; i++) {
      permissions.push(userPermissions[i].name);
    }
    return { user, permissions };
  }
  return false;
}
