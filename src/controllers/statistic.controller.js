const User = require("../models/user.model");
const Project = require("../models/project.model");
const Session = require("../models/session.model");
const moment = require("moment");

function getStatistic(_, res) {
  const freelancers = User.find({ role: "freelancer" }).count().exec();
  const companies = User.find({ role: "company" }).count().exec();
  const projects = Project.find().count().exec();
  const sessions = Session.find({ state: "FINISHED" }).exec();

  Promise.all([freelancers, companies, projects, sessions]).then(function (
    result
  ) {
    res.status(200).json({
      freelancer: result[0],
      companies: result[1],
      projects: result[2],
      finishedTasksOfCurrentWeek: getFinishedTasksOfCurrentWeek(result[3]),
    });
  });
}

function getFinishedTasksOfCurrentWeek(sessions) {
  const firstDayOfWeek = moment().startOf("isoWeek").valueOf();
  const lastDayOfWeek = moment().endOf("isoWeek").valueOf();
  const finishedSessions = [];
  sessions.map((session) => {
    const sessionDate = moment(session.date).valueOf();
    if (sessionDate > firstDayOfWeek && sessionDate < lastDayOfWeek) {
      return finishedSessions.push(session);
    }
    return;
  });

  return {
    countTasksCurrentWeek: finishedSessions.length,
    countTasksCurrentWeekPerDay:
      getFinishedTasksForEveryDayOfCurrentWeek(finishedSessions),
  };
}

function getFinishedTasksForEveryDayOfCurrentWeek(sessions) {
  const sessionsPerDay = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  sessions.map((session) => {
    const sessionDate = moment(session.date).format("dddd");
    sessionsPerDay[sessionDate] = [...sessionsPerDay[sessionDate], session];
  });

  return sessionsPerDay;
}

module.exports = { getStatistic };
