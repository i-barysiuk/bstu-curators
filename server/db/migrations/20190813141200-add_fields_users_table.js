"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "users",
          "favoriteGroups",
          {
            type: Sequelize.JSON,
            defaultValue: [],
            allowNull: true
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "users",
          "favoriteStudents",
          {
            type: Sequelize.JSON,
            defaultValue: [],
            allowNull: true
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("user", "favoriteGroups", {
          transaction: t
        }),
        queryInterface.removeColumn("user", "favoriteStudents", {
          transaction: t
        })
      ]);
    });
  }
};
