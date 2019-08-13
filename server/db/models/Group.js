const Sequelize = require("sequelize");
const sequelize = require("../");

var Group = sequelize.define(
  "groups",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    curatorId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    course: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    group: {
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
    faculty: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cathedra: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    totalStudents: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    gender: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {}
    },
    community: {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    },
    family: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {}
    },
    geography: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {}
    },
    living: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {}
    },
    social: {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    },
    others: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM(
        "Active",
        "Arhive"
      ),
      allowNull: false
    },
    studyProcess: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {}
    }
  },
  {
    timestamps: true
  }
);

module.exports = Group;
