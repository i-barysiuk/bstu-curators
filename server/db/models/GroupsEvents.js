const Sequelize = require("sequelize");
const sequelize = require("../");

var GroupsEvents = sequelize.define(
  "groupsEvents",
  {
    assignAt: {
      type: Sequelize.DATE
    },
    groupId: {
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

module.exports = GroupsEvents;
