const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db } = require('./db');
const userRouter = require('../routes/user.router');
const authRouter = require('../routes/auth.router');
const testRouter = require('../routes/test.router');
const projectRouter = require('../routes/project.router');

const app = express();

db();

// body parser
app.use(bodyParser.json());

// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(testRouter);
app.use(projectRouter);

module.exports = app;
