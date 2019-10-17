const Sequelize = require("sequelize");
const sequelize = require("../");

const Events = require("./Events");

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
      type: Sequelize.UUID,
      allowNull: false
    },
    eventId: {
      type: Sequelize.UUID,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
GroupsEvents.belongsTo(Events, {
  onDelete: "CASCADE",
  foreignKey: "eventId"
});
module.exports = GroupsEvents;
