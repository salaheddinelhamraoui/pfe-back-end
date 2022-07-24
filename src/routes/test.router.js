const express = require("express");
const { hello, imAdmin } = require("../controllers/test.controller");
const { isAuth, isAdmin } = require("../middlewares/auth.middleware");
const testRouter = express.Router();

testRouter.get("/imAuth", isAuth, hello);
testRouter.get("/imAdmin", isAuth, isAdmin, imAdmin);

module.exports = testRouter;
