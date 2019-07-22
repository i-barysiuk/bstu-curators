const Sequelize = require("sequelize");
const sequelize = require("..");
var bcrypt = require("bcrypt");

var Group = sequelize.define(
  "groups",
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    faculty: {
      type: Sequelize.ENUM('ФЭИС','ЭФ ','СФ','МСФ','ФИСЭ', 'Заочное', 'Иностранные'),
      allowNull: false
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    total: {
      type: Sequelize.INT,
      allowNull: false
    },
    gender: {
      type: Sequelize.JSON({
        men: INT,
        women: INT
      }),
      allowNull: false
    },
    comunity: {
      type: Sequelize.JSON({
        brsm: INT,
        profcom: INT,
        belrus: INT,
        other: INT
      }),
      allowNull: false
    },
    family: {
      type: Sequelize.JSON({
        standart: INT,
        many: INT,
        incomplete: INT,
        orphans: INT
      }),
      allowNull: false
    },
    geography: {
      type: Sequelize.JSON({
        local: INT,
        nonresident: INT,
        foreigners: INT
      }),
      allowNull: true
    },
    living: {
      type: Sequelize.JSON({
        parents: INT,
        relatives: INT,
        hostel: INT,
        apartments: INT
      }),
      allowNull: false
    },
    social: {
      type: Sequelize.JSON({
        
      }),
      allowNull: true
    },
    others: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }
);

Group.prototype.validName = function(name) {
  return bcrypt.compareSync(name, this.name);
};

module.exports = Group;
