"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("groups", "curatorId", {
      type: Sequelize.UUID,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("groups", "curatorId");
  }
};
