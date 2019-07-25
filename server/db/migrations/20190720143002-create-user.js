"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
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
      birthday: {
        type: Sequelize.DATE,
        allowNull: false
      },
      sex: {
        type: Sequelize.ENUM("men", "women"),
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
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "user",
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      tokens: {
        type: Sequelize.JSON,
        defaultValue: [],
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
