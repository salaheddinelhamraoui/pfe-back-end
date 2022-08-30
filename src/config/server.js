const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { db } = require("./db");
const userRouter = require("../routes/user.router");
const authRouter = require("../routes/auth.router");
const testRouter = require("../routes/test.router");
const projectRouter = require("../routes/project.router");
const statisticRouter = require("../routes/statistic.router");
const sessionRouter = require("../routes/session.router");
const documentRouter = require("../routes/document.router");

const app = express();

db();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// body parser
app.use(bodyParser.json());

// Dev Logginf Middleware
if (process.env.NODE_ENV === "development") {
  app.use(cors());
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(testRouter);
app.use(projectRouter);
app.use(sessionRouter);
app.use(documentRouter);
app.use(statisticRouter);

module.exports = app;
