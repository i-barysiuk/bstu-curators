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
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fullName: {
      type: Sequelize.STRING,
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
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: 1
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
    studyProcess: {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    }
  },
  {
    timestamps: true
  }
);

module.exports = Group;
