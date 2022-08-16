const express = require('express');
const {
  register,
  login,
  signInWithToken,
} = require('../controllers/auth.controller');
const { isAuth } = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/signInWithToken', isAuth, signInWithToken);

module.exports = authRouter;
