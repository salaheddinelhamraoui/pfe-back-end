const Session = require("../models/session.model");
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
  const session = req.body;
  try {
    Project.findByIdAndUpdate(
      ObjectId(sessionId),
      session,
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


module.exports = {
  addSession,
  findSession,
  findAllSessions,
  updateSession,
};
