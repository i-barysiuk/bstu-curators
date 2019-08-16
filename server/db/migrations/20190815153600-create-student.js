"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("students", {
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
      onlineAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      studentId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      f_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false
      },
      sex: {
        type: Sequelize.ENUM("men", "women"),
        allowNull: false
      },
      passport_series: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passportId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      issuing_authority: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_issue: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false
      },
      home_adress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      study_adress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      chronic_disease: {
        type: Sequelize.STRING,
        allowNull: true
      },
      health_group: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pe_group: {
        type: Sequelize.STRING,
        allowNull: false
      },
      faculty: {
        type: Sequelize.ENUM(
          "ФЭИС",
          "ЭФ ",
          "СФ",
          "МСФ",
          "ФИСЭ",
          "Заочное",
          "Иностранные"
        ),
        allowNull: false
      },
      group: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hobbies: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      representatives: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("students");
  }
};
