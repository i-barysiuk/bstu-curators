"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("groups", "group", {
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("groups", "group", {
      type: Sequelize.ENUM(
        "ФЭИС",
        "ЭФ ",
        "СФ",
        "МСФ",
        "ФИСЭ",
        "Заочное",
        "Иностранные"
      ),
      allowNull: false
    });
  }
};
