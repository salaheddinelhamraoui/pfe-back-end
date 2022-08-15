const express = require('express');
const { addProject } = require('../controllers/project.controller');
const projectRouter = express.Router();

projectRouter.post('/addProject', addProject);

module.exports = projectRouter;
