"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable(
          "groupsEvents",
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
          { transaction: t }
        ),
        queryInterface.createTable(
          "studentsEvents",
          {
            id: {
              type: Sequelize.UUID,
              primaryKey: true,
              defaultValue: Sequelize.UUIDV4
            },
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
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable("groupsEvents", {
          transaction: t
        }),
        queryInterface.dropTable("studentsEvents", {
          transaction: t
        })
      ]);
    });
  }
};
