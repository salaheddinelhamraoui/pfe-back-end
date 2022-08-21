const Document = require("../models/document.model");
const { ObjectId } = require("mongodb");
const { cloudinary } = require("../utils/cloudinary");
const formidable = require("formidable");

async function addDocument(req, res) {
  const form = formidable({ multiples: true });
  try {
    form.parse(req, async (err, fields, file) => {
      const { title = "", type = "" } = fields;
      const { document = "" } = file;

      const uploadeFileUrl = await cloudinary.uploader.upload(
        document.filepath,
        {
          upload_preset: "avatars",
        }
      );
      const documentUploaded = new Document({
        title,
        type,
        file_url: uploadeFileUrl.url,
      });

      documentUploaded.save((err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.status(200).json({
          message: "Document saved",
          result,
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Crashed" });
  }
}

function findAllDocuments(req, res) {
  let { page, limit, documentName } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (!documentName) {
    documentName = "";
  }

  Document.find((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({
      metadata: {
        page,
        count: result.length,
        size: Math.ceil(result.length / limit),
      },
      result: page ? result.slice(startIndex, endIndex) : result,
    });
  });
}

function findDocumentByName(req, res) {
  let documentName = req.body.documentName;
  const documentRole = req.body.documentRole;

  if (!documentName) {
    documentName = "";
  }

  Document.find(
    { "data.displayName": { $regex: documentName }, role: documentRole },
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        message: "Document found",
        result,
      });
    }
  );
}

function deleteDocument(req, res) {
  try {
    const { documentId } = req.params;
    console.log(documentId);

    Document.deleteOne({ _id: ObjectId(documentId) }, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({ message: "Document deleted" });
    });
  } catch (err) {
    console.log(err);

    return res.status(404).json({ message: err });
  }
}

module.exports = {
  addDocument,
  findAllDocuments,
  deleteDocument,
  findDocumentByName,
};
