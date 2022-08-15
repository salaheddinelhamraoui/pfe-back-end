const express = require("express");
const {
  addProject,
  findProject,
  findAllProjects,
  updateProject,
} = require("../controllers/project.controller");
const projectRouter = express.Router();

projectRouter.post("/addProject", addProject);
projectRouter.get("/findProject/:projectId", findProject);
projectRouter.get("/findAllProjects", findAllProjects);
projectRouter.put("/updateProject/:projectId", updateProject);

module.exports = projectRouter;
