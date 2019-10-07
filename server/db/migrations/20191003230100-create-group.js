"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("groups", {
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
      curatorId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      group: {
        type: Sequelize.ENUM(
          "ФЭИС",
          "ЭФ",
          "СФ",
          "МСФ",
          "ФИСЭ",
          "Заочное",
          "Иностранные"
        ),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      totalStudents: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gender: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: false
      },
      community: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: true
      },
      family: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: false
      },
      geography: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: false
      },
      living: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: false
      },
      social: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: true
      },
      others: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      course: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      department: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cathedra: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },

      studyProcess: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("groups");
  }
};
