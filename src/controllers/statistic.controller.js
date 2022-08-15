const User = require("../models/user.model");
const Project = require("../models/project.model");

async function getStatistic(_, res) {
  const result = {
    freelancer: "",
    companies: "",
    projects: "",
  };

  var freelancers = User.find({ role: "FREELANCER" }).count().exec();
  var companies = User.find({ role: "COMPANY" }).count().exec();
  var projects = Project.find().count().exec();

  Promise.all([freelancers, companies, projects]).then(function (counts) {
    res.status(200).json({
      freelancer: counts[0],
      companies: counts[1],
      projects: counts[2],
    });
  });
}

module.exports = { getStatistic };
