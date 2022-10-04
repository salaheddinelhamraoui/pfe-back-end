const express = require("express");
const {
  addSession,
  findSession,
  findAllSessions,
  updateSession,
  findSessionByProject,
  findSessionByCompany,
  findSessionByCompanyToday,
  addSignatureCompany,
  addSignatureFreelancer
} = require("../controllers/session.controller");
const sessionRouter = express.Router();

sessionRouter.post("/addSession", addSession);
sessionRouter.get("/findSession/:sessionId", findSession);
sessionRouter.get("/findSessionByProjectId/:projectId", findSessionByProject);
sessionRouter.get("/findSessionByUserId/:userId", findSessionByCompany);
sessionRouter.get("/findSessionByUserIdToday/:userId", findSessionByCompanyToday);
sessionRouter.get("/findAllSessions", findAllSessions);
sessionRouter.patch("/updateSession/:sessionId", updateSession);
sessionRouter.post("/addSignatureCompany", addSignatureCompany);
sessionRouter.post("/addSignatureFreelancer", addSignatureFreelancer);


module.exports = sessionRouter;
