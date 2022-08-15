const express = require('express');
const {
  addUser,
  findUser,
  findAllUsers,
  updateUser,
} = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/addUser', addUser);
userRouter.get('/findUser/:userId', findUser);
userRouter.get('/findAllUsers', findAllUsers);
userRouter.put('/updateUser/:userId', updateUser);

module.exports = userRouter;
