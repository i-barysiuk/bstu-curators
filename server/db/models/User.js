const Sequelize = require("sequelize");
const sequelize = require("../");
var bcrypt = require("bcrypt");

var User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    onlineAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: true
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
    },
    department: {
      type: Sequelize.STRING,
      allowNull: true
    },
    position: {
      type: Sequelize.STRING,
      allowNull: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true
    },
    favoriteGroups: {
      type: Sequelize.JSON,
      defaultValue: [],
      allowNull: false
    },
    favoriteStudents: {
      type: Sequelize.JSON,
      defaultValue: [],
      allowNull: false
    },
    imageBase64: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async user => {
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(user.password, salt);
      }
    }
  }
);

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
