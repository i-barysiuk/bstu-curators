const Group = require("../db/models/Group");

class GroupService {
  get(id) {
    return Group.findOne({
      where: {
        id
      }
    });
  }

  getAll() {
    return Group.findAll({});
  }

  create(body) {
    return Group.findOrCreate({
      where: {
        name: body.name
      },
      defaults: {
        curatorId: body.curatorId,
        faculty: body.faculty,
        totalStudents: body.totalStudents,
        gender: body.gender,
        community: body.community,
        family: body.family,
        geography: body.geography,
        living: body.living,
        social: body.social,
        others: body.others
      }
    });
  }

  update(body, id) {
    return User.update(body, {
      where: {
        id
      },
      returning: true
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

module.exports = new GroupService();
