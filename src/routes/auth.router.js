const express = require('express');
const {
  register,
  login,
  signInWithToken,
} = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/signInWithToken', signInWithToken);

module.exports = authRouter;
