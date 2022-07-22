const express = require("express");
const cors = require("cors");
const { db } = require("./db");
const userRouter = require("../routes/user.route");

const app = express();

db();
app.use(cors());
app.use(express.json());
app.use(userRouter);

module.exports = app;
