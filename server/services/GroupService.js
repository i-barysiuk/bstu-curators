const Group = require("../db/models/Group");
const _ = require("lodash");

class GroupService {
  get(id) {
    return Group.findOne({
      where: {
        id
      }
    });
  }

  getActive() {
    return new Promise((resolve, reject) => {
      Group.findAll({
        attributes: ["id", "name", "course", "group"],
        where: { isActive: true }
      })
        .then(data => {
          resolve(_.groupBy(data, "group"));
        })
        .catch(err => reject(err));
    });
  }

  getArchive() {
    return new Promise((resolve, reject) => {
      Group.findAll({
        attributes: ["id", "name", "course", "group"],
        where: { isActive: false }
      })
        .then(data => {
          resolve(_.groupBy(data, "group"));
        })
        .catch(err => reject(err));
    });
  }

  select(where) {
    return Group.findAll({
      attributes: ["id", "name", "course", "group"],
      where: where
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
        group: body.group,
        fullName: body.fullName,
        course: body.course,
        department: body.department,
        cathedra: body.cathedra,
        studyProcess: body.studyProcess,
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
    return Group.update(body, {
      where: {
        id
      },
      returning: true
    });
  }

  delete(id) {
    return Group.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = new GroupService();
