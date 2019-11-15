"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            "users",
            "imageBase64", {
                type: Sequelize.TEXT,
                allowNull: true
            }

        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("users",
            "imageBase64", {
                type: Sequelize.STRING,
                allowNull: true
            }
        );
    }
};