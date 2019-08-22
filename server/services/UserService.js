const Sequelize = require("sequelize");
const User = require("../db/models/User");
const Op = Sequelize.Op;

class UserService {
  get(id) {
    return User.findOne({
      where: {
        id
      }
    });
  }

  find(user) {
    return User.findOne({
      where: {
        [Op.or]: [{ email: user }, { phone: user }]
      }
    });
  }

  getAll() {
    return User.findAll({});
  }

  getAllLike(pattern) {
    return User.findAll({
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.iLike]: `%${pattern}%`
            }
          },
          {
            last_name: {
              [Op.iLike]: `%${pattern}%`
            }
          },
          {
            f_name: {
              [Op.iLike]: `%${pattern}%`
            }
          },
          {
            phone: {
              [Op.iLike]: `%${pattern}%`
            }
          },
          {
            department: {
              [Op.iLike]: `%${pattern}%`
            }
          },
          {
            email: {
              [Op.iLike]: `%${pattern}%`
            }
          }
        ]
      }
    });
  }

  create(body) {
    return User.findOrCreate({
      where: {
        email: body.email
      },
      defaults: {
        onlineAt: body.onlineAt,
        password: body.password,
        birthday: body.birthday,
        sex: body.sex,
        first_name: body.first_name,
        last_name: body.last_name,
        f_name: body.f_name,
        phone: body.phone,
        isActive: body.isActive,
        role: body.role,
        department: body.department,
        position: body.position,
        title: body.title
      }
    });
  }

  update(body, id) {
    return User.update(body, {
      where: {
        id
      }
    });
  }

  delete(id) {
    return User.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = new UserService();
