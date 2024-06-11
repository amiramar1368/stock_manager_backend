import { Sequelize } from "@sequelize/core";
import { db } from "../config.js";

const createDB = new Sequelize("", db.username, db.password, {
  dialect: "mysql",
  host: db.host,
  port: db.port,
});
await createDB.query(`CREATE DATABASE IF NOT EXISTS ${db.name};`);

var sequelize = new Sequelize(db.name, db.username, db.password, {
  dialect: "mysql",
  host: db.host,
  port: db.port,
  logging: false,
});

export default sequelize;
