const Session = require("../models/session.model");
const Project = require("../models/project.model");
const { ObjectId } = require("mongodb");

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
    });
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

function findSessionByUser(req, res) {
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

function findSessionByUserToday(req, res) {
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

module.exports = {
  addSession,
  findSession,
  findAllSessions,
  updateSession,
  findSessionByProject,
  findSessionByUser,
  findSessionByUserToday,
};
