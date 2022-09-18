const express = require("express");
const {
  addSession,
  findSession,
  findAllSessions,
  updateSession,
  findSessionByProject,
  findSessionByUser,
  findSessionByUserToday,
} = require("../controllers/session.controller");
const sessionRouter = express.Router();

sessionRouter.post("/addSession", addSession);
sessionRouter.get("/findSession/:sessionId", findSession);
sessionRouter.get("/findSessionByProjectId/:projectId", findSessionByProject);
sessionRouter.get("/findSessionByUserId/:userId", findSessionByUser);
sessionRouter.get("/findSessionByUserIdToday/:userId", findSessionByUserToday);
sessionRouter.get("/findAllSessions", findAllSessions);
sessionRouter.patch("/updateSession/:sessionId", updateSession);

module.exports = sessionRouter;
