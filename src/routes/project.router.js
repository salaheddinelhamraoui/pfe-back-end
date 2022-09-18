const express = require("express");
const {
  addProject,
  findProject,
  findAllProjects,
  updateProject,
  findProjectByCompanyId,
  deleteProject,
} = require("../controllers/project.controller");
const projectRouter = express.Router();

projectRouter.post("/addProject", addProject);
projectRouter.get("/findProject/:projectId", findProject);
projectRouter.get("/findProjectByCompanyId/:companyId", findProjectByCompanyId);
projectRouter.get("/findAllProjects", findAllProjects);
projectRouter.patch("/updateProject/:projectId", updateProject);
projectRouter.delete("/deleteProject/:projectId", deleteProject);

module.exports = projectRouter;
