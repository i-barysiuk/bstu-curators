const Sequelize = require("sequelize");
const Group = require("../db/models/Group");
const Op = Sequelize.Op;

class GroupService {
  get(uuid) {
    return Group.findOne({
      where: {
        uuid
      }
    });
  }

  find(userId) {
    return Group.findOne({
      where: {
        [Op.or]: [{ name: userId}, { faculty: userId }]
      }
    });
  }

  getAll() {
    return Group.findAll({});
  }

  create(body) {
    return Group.findOrCreate({
      where: {
        uuid: body.uuid
      },
      defaults: {
        userId: body.userId,
        faculty: body.faculty,
        name: body.name,
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
