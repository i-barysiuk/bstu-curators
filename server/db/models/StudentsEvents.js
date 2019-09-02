const Sequelize = require("sequelize");
const sequelize = require("../");

var StudentsEvents = sequelize.define(
  "studentsEvents",
  {
    assignAt: {
      type: Sequelize.DATE
    },
    studentId: {
      type: Sequelize.STRING
    },
    eventId: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: true
  }
);

module.exports = StudentsEvents;
