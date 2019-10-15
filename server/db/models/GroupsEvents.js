const Sequelize = require("sequelize");
const sequelize = require("../");

var GroupsEvents = sequelize.define(
  "groupsEvents",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
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
