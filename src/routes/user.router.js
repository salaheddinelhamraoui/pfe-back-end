const express = require('express');
const {
  addUser,
  findUser,
  findAllUsers,
  updateUser,
  deleteUser,
  findUserByName,
} = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/addUser', addUser);
userRouter.get('/findUser/:userId', findUser);
userRouter.get('/findAllUsers', findAllUsers);
userRouter.patch('/updateUser/:userId', updateUser);
userRouter.delete('/deleteUser/:userId', deleteUser);
userRouter.post('/getUserByName', findUserByName);

module.exports = userRouter;
