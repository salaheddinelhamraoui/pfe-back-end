const express = require("express");
const {
  addDocument,
  findAllDocuments,
  deleteDocument,
  findDocumentByName,
} = require("../controllers/document.controller");
const documentRouter = express.Router();

documentRouter.post("/addDocument", addDocument);
documentRouter.get("/findAllDocuments", findAllDocuments);
documentRouter.delete("/deleteDocument/:documentId", deleteDocument);
documentRouter.post("/getDocumentByName", findDocumentByName);

module.exports = documentRouter;
