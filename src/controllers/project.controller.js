const Project = require("../models/project.model");
const Session = require("../models/session.model");
const { ObjectId } = require("mongodb");
var moment = require("moment");

function addProject(req, res) {
  const { creator_id, freelancer_id, company_id } = req.body;
  const project = new Project({
    creator_id: ObjectId(creator_id),
    freelancer_id: ObjectId(freelancer_id),
    company_id: ObjectId(company_id),
    ...req.body,
  });
  project.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({
      message: "Project saved",
      result,
    });
  });
}

function findProject(req, res) {
  const { projectId } = req.params;
  try {
    Project.findById(ObjectId(projectId), (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!result) {
        return res.status(404).json({
          message: "Project Not found by ID :" + projectId,
          result,
        });
      }
      return res.status(200).json({
        message: "Project found",
        result,
      });
    }).populate("creator_id freelancer_id company_id");
  } catch (error) {
    return res.status(400).json({
      message: "Invalide project ID",
      error,
    });
  }
}

function findAllProjects(_, res) {
  Project.find((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({
      message: "Projects found",
      result,
    });
  }).populate("creator_id freelancer_id company_id");
}

function updateProject(req, res) {
  const { projectId } = req.params;
  const { name, desc } = req.body;
  try {
    Project.findByIdAndUpdate(
      ObjectId(projectId),
      {
        $set: {
          project_name: name,
          description: desc,
        },
      },
      { returnDocument: "after" },
      (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        if (!result) {
          return res.status(404).json({
            message: "Projects Not found by ID :" + projectId,
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

function findProjectByCompanyId(req, res) {
  const { companyId } = req.params;
  try {
    Project.find({ company_id: ObjectId(companyId) }, (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!result) {
        return res.status(404).json({
          message: "Projects Not found by ID :" + userId,
          result,
        });
      }
      return res.status(200).json({
        message: "Projects found",
        result,
      });
    }).populate("creator_id freelancer_id company_id");
  } catch (error) {
    return res.status(500).json(error);
  }
}
function findProjectByFreelancerId(req, res) {
  const { freelancerId } = req.params;
  try {
    Project.find({ freelancer_id: ObjectId(freelancerId) }, (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!result) {
        return res.status(404).json({
          message: "Projects Not found by ID :" + userId,
          result,
        });
      }
      return res.status(200).json({
        message: "Projects found",
        result,
      });
    }).populate("creator_id freelancer_id company_id");
  } catch (error) {
    return res.status(500).json(error);
  }
}

function deleteProject(req, res) {
  const { projectId } = req.params;
  try {
    Project.findByIdAndDelete(ObjectId(projectId), (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!result) {
        return res.status(404).json({
          message: "Project Not found by ID :" + projectId,
          result,
        });
      }
      return res.status(200).json({
        message: "Project deleted",
        result,
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

function restHours(req, res) {
  const { projectId } = req.params;
  try {
    Session.find({ project_id: ObjectId(projectId) }, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      let diffTime = 0;
      result.map((item) => {
        const date = moment(item.date);
        const endDate = moment(item.end_date);
        diffTime += endDate.diff(date, "minutes");
      });
      diffTime = diffTime / 60;

      Project.findById(ObjectId(projectId), (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        if (!result) {
          return res.status(404).json({
            message: "Project Not found by ID :" + projectId,
            result,
          });
        }
        return res.status(200).json({
          consumedTime: diffTime,
          totalSessionsTime: result.total_session_hours,
        });
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalide project ID",
      error,
    });
  }
}

module.exports = {
  addProject,
  findProject,
  findAllProjects,
  updateProject,
  findProjectByCompanyId,
  deleteProject,
  restHours,
  findProjectByFreelancerId,
};
