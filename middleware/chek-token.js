import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_KEY } from "../config.js";

export function checkToken(req, res, next) {
  let accessToken = req.headers["authorization"];
  accessToken = accessToken ? accessToken.split(" ")[1] : "undefined";
  if (accessToken === "undefined") {
    return res.sendFailureResponse(403, "no token provided");
    }
    jwt.verify(accessToken, ACCESS_TOKEN_KEY, async (err, user) => {
      if (err) {
        return res.sendFailureResponse(401, "invalid token");
        }
        req.user = user;
        next();
  });
}
