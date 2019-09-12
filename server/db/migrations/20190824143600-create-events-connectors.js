"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable(
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
          { transaction: t }
        ),
        queryInterface.createTable(
          "studentsEvents",
          {
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
