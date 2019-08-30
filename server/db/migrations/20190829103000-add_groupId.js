"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("students", "groupId", {
      type: Sequelize.UUID,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("students", "groupId");
  }
};
