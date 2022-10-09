const Session = require("../models/session.model");
const Project = require("../models/project.model");
const { ObjectId } = require("mongodb");
const { cloudinary } = require("../utils/cloudinary");
const formidable = require("formidable");

function addSession(req, res) {
  const { creator_id, freelancer_id } = req.body;
  const session = new Session({
    creator_id: ObjectId(creator_id),
    project_id: ObjectId(freelancer_id),
    ...req.body,
  });
  session.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({
      message: "Session saved",
      result,
    });
  });
}

function findSession(req, res) {
  const { sessionId } = req.params;
  try {
    Session.findById(ObjectId(sessionId), (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!result) {
        return res.status(404).json({
          message: "Session Not found by ID :" + sessionId,
          result,
        });
      }
      return res.status(200).json({
        message: "Session found",
        result,
      });
    }).populate("project_id");
  } catch (error) {
    return res.status(400).json({
      message: "Invalide project ID",
      error,
    });
  }
}

function findAllSessions(_, res) {
  Session.find((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({
      message: "Sessions found",
      result,
    });
  });
}

function updateSession(req, res) {
  const { sessionId } = req.params;

  const { title, description, date, endDate } = req.body;
  try {
    Session.findByIdAndUpdate(
      ObjectId(sessionId),
      {
        $set: {
          title: title,
          description: description,
          date: date,
          end_date: endDate,
        },
      },
      { returnDocument: "after" },
      (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        if (!result) {
          return res.status(404).json({
            message: "Session Not found by ID :" + sessionId,
            result,
          });
        }
        return res.status(200).json({
          massege: "Upadated with success!",
          result,
        });
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
}

function addSignatureCompany(req, res) {
  const form = formidable({ multiples: true });
  try {
    form.parse(req, async (err, fields, file) => {
      if (err) {
        next(err);
        return;
      }
      const { sessionId = "" } = fields;
      const { document = "" } = file;

      const uploadedResponse = await cloudinary.uploader.upload(
        document.filepath,
        {
          upload_preset: "avatars",
        }
      );

      let fileURL = uploadedResponse.url;

      Session.findByIdAndUpdate(
        ObjectId(sessionId),
        {
          $set: {
            company_signature: fileURL,
            state: "Signed By Company",
          },
        },
        { returnDocument: "after" },
        (err, result) => {
          if (err) {
            return res.status(400).json(err);
          }
          if (!result) {
            return res.status(404).json({
              message: "Session Not found by ID :" + sessionId,
              result,
            });
          }
          return res.status(200).json({
            massege: "Upadated with success!",
            result,
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
function addSignatureFreelancer(req, res) {
  const form = formidable({ multiples: true });
  try {
    form.parse(req, async (err, fields, file) => {
      if (err) {
        next(err);
        return;
      }
      const { sessionId = "" } = fields;
      const { document = "" } = file;

      const uploadedResponse = await cloudinary.uploader.upload(
        document.filepath,
        {
          upload_preset: "avatars",
        }
      );

      let fileURL = uploadedResponse.url;

      Session.findByIdAndUpdate(
        ObjectId(sessionId),
        {
          $set: {
            freelancer_signature: fileURL,
            state: "Signed By Freelancer",
          },
        },
        { returnDocument: "after" },
        (err, result) => {
          if (err) {
            return res.status(400).json(err);
          }
          if (!result) {
            return res.status(404).json({
              message: "Session Not found by ID :" + sessionId,
              result,
            });
          }
          return res.status(200).json({
            massege: "Upadated with success!",
            result,
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

function findSessionByProject(req, res) {
  const { projectId } = req.params;
  try {
    Session.find({ project_id: ObjectId(projectId) }, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        message: "Sessions found",
        result,
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalide project ID",
      error,
    });
  }
}

function findSessionByCompany(req, res) {
  const { userId } = req.params;
  console.log("userId", userId);

  try {
    Project.find({ company_id: ObjectId(userId) }, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      const filterdResult = result.map((project) => {
        return {
          project_id: project._id,
        };
      });
      Session.find({ $or: filterdResult }, (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json({
          message: "Sessions found",
          result,
        });
      });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      message: "Invalide project ID",
      error,
    });
  }
}
function findSessionByFreelancer(req, res) {
  const { userId } = req.params;
  console.log("userId", userId);

  try {
    Project.find({ freelancer_id: ObjectId(userId) }, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      const filterdResult = result.map((project) => {
        return {
          project_id: project._id,
        };
      });
      Session.find({ $or: filterdResult }, (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json({
          message: "Sessions found",
          result,
        });
      });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      message: "Invalide project ID",
      error,
    });
  }
}

function findSessionByCompanyToday(req, res) {
  const { userId } = req.params;
  console.log("userId", userId);

  try {
    Project.find({ company_id: ObjectId(userId) }, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      const filterdResult = result.map((project) => {
        return {
          project_id: project._id,
        };
      });
      var startDate = new Date();
      startDate.setSeconds(0);
      startDate.setHours(0);
      startDate.setMinutes(0);

      var endDate = new Date();
      endDate.setSeconds(59);
      endDate.setMinutes(59);
      endDate.setHours(23);

      Session.find(
        {
          $and: [
            { $or: filterdResult },
            {
              date: { $gte: startDate },
            },
            {
              date: { $lte: endDate },
            },
          ],
        },
        (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          return res.status(200).json({
            message: "Sessions found",
            result,
          });
        }
      );
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      message: "Invalide project ID",
      error,
    });
  }
}
function findSessionByFreelancerToday(req, res) {
  const { userId } = req.params;
  console.log("userId", userId);

  try {
    Project.find({ freelancer_id: ObjectId(userId) }, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      const filterdResult = result.map((project) => {
        return {
          project_id: project._id,
        };
      });
      var startDate = new Date();
      startDate.setSeconds(0);
      startDate.setHours(0);
      startDate.setMinutes(0);

      var endDate = new Date();
      endDate.setSeconds(59);
      endDate.setMinutes(59);
      endDate.setHours(23);

      Session.find(
        {
          $and: [
            { $or: filterdResult },
            {
              date: { $gte: startDate },
            },
            {
              date: { $lte: endDate },
            },
          ],
        },
        (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          return res.status(200).json({
            message: "Sessions found",
            result,
          });
        }
      );
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      message: "Invalide project ID",
      error,
    });
  }
}

module.exports = {
  addSession,
  findSession,
  findAllSessions,
  updateSession,
  findSessionByProject,
  findSessionByCompany,
  findSessionByCompanyToday,
  addSignatureCompany,
  addSignatureFreelancer,
  findSessionByFreelancerToday,
  findSessionByFreelancer,
};
