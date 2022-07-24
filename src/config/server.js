const express = require("express");
const cors = require("cors");
const { db } = require("./db");
const userRouter = require("../routes/user.router");
const authRouter = require("../routes/auth.router");
const testRouter = require("../routes/test.router");

const app = express();

db();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(testRouter);

module.exports = app;
