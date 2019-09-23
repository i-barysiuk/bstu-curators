"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameColumn("groups", "faculty", "group", {
          transaction: t
        }),
        queryInterface.addColumn(
          "groups",
          "course",
          {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "groups",
          "department",
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "groups",
          "cathedra",
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "groups",
          "fullName",
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "groups",
          "isActive",
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "groups",
          "studyProcess",
          {
            type: Sequelize.JSON,
            defaultValue: {},
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
        queryInterface.removeColumn("groups", "course", { transaction: t }),
        queryInterface.removeColumn("groups", "department", { transaction: t }),
        queryInterface.removeColumn("groups", "cathedra", { transaction: t }),
        queryInterface.removeColumn("groups", "fullName", { transaction: t }),
        queryInterface.removeColumn("groups", "isActive", { transaction: t }),
        queryInterface.removeColumn("groups", "studyProcess", {
          transaction: t
        }),
        queryInterface.renameColumn("groups", "group", "faculty", {
          transaction: t
        })
      ]);
    });
  }
};
