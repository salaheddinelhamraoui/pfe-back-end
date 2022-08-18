const express = require("express");
const {
  addUser,
  findUser,
  findAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/addUser", addUser);
userRouter.get("/findUser/:userId", findUser);
userRouter.get("/findAllUsers", findAllUsers);
userRouter.put("/updateUser/:userId", updateUser);
userRouter.delete("/deleteUser/:userId", deleteUser);

module.exports = userRouter;
