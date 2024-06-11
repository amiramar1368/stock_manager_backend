const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  PORT,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXPIRATION,
  ACCESS_TOKEN_EXPIRATION,
} = process.env;
export const db = {
  name: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
};

export { PORT, ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION };

// export var roles = {
//   S_ADMIN: "s-admin",
//   ADMIN: "admin",
//   ADMIN_EDARI: "admin-edari",
//   ADMIN_HARDWARE: "admin-hardware",
//   HARDWARE: "hardware",
//   DRIVER: "driver",
//   USER: "user",
// };
