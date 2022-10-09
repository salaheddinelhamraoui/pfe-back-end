const express = require("express");
const {
  addProject,
  findProject,
  findAllProjects,
  updateProject,
  findProjectByCompanyId,
  deleteProject,
  restHours,
  findProjectByFreelancerId,
} = require("../controllers/project.controller");
const projectRouter = express.Router();

projectRouter.post("/addProject", addProject);
projectRouter.get("/findProject/:projectId", findProject);
projectRouter.get("/findProjectByCompanyId/:companyId", findProjectByCompanyId);
projectRouter.get(
  "/findProjectByFreelancerId/:freelancerId",
  findProjectByFreelancerId
);
projectRouter.get("/findAllProjects", findAllProjects);
projectRouter.patch("/updateProject/:projectId", updateProject);
projectRouter.delete("/deleteProject/:projectId", deleteProject);
projectRouter.get("/restHours/:projectId", restHours);

module.exports = projectRouter;
