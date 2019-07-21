"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", {
      departments: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users",{ departaments, position, title})}
};


"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "users",
          "department",
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "users",
          "position",
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
            "users",
            "title",
            {
              type: Sequelize.STRING,
              allowNull: true
            },
            { transaction: t }
          ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
        return Promise.all([
            queryInterface.removeColumn("user", "department", { transaction: t }),
            queryInterface.removeColumn("user", "position", {transaction: t}),
            queryInterface.removeColumn("user", "title", {transaction: t}),
        ]);
    });
  }
};