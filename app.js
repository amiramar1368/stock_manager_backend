import express from "express";
import "dotenv/config.js";
import cors from "cors";

import { checkToken } from "./middleware/chek-token.js";
import loginRoute from "./routes/login-router.js";
import allRoutes from "./routes/all-router.js";

import { PORT } from "./config.js";
import sequelize from "./utils/db.js";
import insertTestRecord from "./utils/seeders.js";

//Middleware
import  rateLimiter  from "./middleware/rate-limit.js";
import handleError from "./middleware/handle-errors.js";
import resposne from "./middleware/response.js";

const app = express();



//middlewares
app.use(cors());
app.use(rateLimiter);
app.use(handleError);
app.use(resposne);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//login to system
app.use("/users", loginRoute);

//routes
app.use(checkToken, allRoutes);

//test for use scopes in sequelize
// app.get("/test",async (req, res) => {
// const recordes = await GoodType.scope("allGood").findAll();
//   res.json(recordes)
// })

//404 page
app.use((req, res) => {
  res.status(404).json({
    success: false,
    body: null,
    message: "page not found",
  });
});

await sequelize.sync({ alter: true });
insertTestRecord();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
