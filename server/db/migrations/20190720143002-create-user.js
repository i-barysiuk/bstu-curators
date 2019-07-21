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
        type: Sequelize.TEXT,
        allowNull: false
      },
      last_name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      f_name: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      phone: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      role: {
        type: Sequelize.TEXT,
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
