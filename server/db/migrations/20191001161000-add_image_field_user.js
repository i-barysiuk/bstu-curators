"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "users",
            "imageBase64", {
                type: Sequelize.STRING,
                allowNull: true
            }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("users", "imageBase64");
    }
};