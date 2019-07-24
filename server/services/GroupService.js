const Sequelize = require("sequelize");
const Group = require("../db/models/Group");

class GroupService {
  get(uuid) {
    return Group.findOne({
      where: {
        uuid
      }
    });
  }

  getAll() {
    return Group.findAll({});
  }

  create(body) {
    return Group.findOrCreate({
      where: {
        uuid: body.uuid,
        name: body.name
      },
      defaults: {
        userId: body.userId,
        faculty: body.faculty,
        total: body.total,
        gender: body.gender,
        comunity: body.comunity,
        family: body.family,
        geography: body.geography,
        living: body.living,
        social: body.social,
        others: body.others
      }
    });
  }

  update(body, uuid) {
    return User.update(body, {
      where: {
        uuid
      }
    });
  }

  delete(uuid) {
    return User.destroy({
      where: {
        uuid
      }
    });
  }
}

module.exports = new GroupService();
