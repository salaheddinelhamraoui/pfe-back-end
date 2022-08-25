const express = require("express");
const {
  addSession,
  findSession,
  findAllSessions,
  updateSession,
  findSessionByProject,
} = require("../controllers/session.controller");
const sessionRouter = express.Router();

sessionRouter.post("/addSession", addSession);
sessionRouter.get("/findSession/:sessionId", findSession);
sessionRouter.get("/findSessionByProjectId/:projectId", findSessionByProject);
sessionRouter.get("/findAllSessions", findAllSessions);
sessionRouter.put("/updateSession/:sessionId", updateSession);

module.exports = sessionRouter;
