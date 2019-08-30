const Sequelize = require("sequelize");
const sequelize = require("../");

var Events = sequelize.define(
  "events",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    creator: {
      type: Sequelize.STRING,
      allowNull: false
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    subtitle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    place: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dataStart: {
      type: Sequelize.DATE,
      allowNull: false
    },
    dataEnd: {
      type: Sequelize.DATE,
      allowNull: true
    },
    customIcon: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Events;
