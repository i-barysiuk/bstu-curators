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
