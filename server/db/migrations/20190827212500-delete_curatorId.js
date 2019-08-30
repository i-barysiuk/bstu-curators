"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("groups", "curatorId");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("groups", "curatorId", {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
