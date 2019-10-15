const Sequelize = require("sequelize");
const GroupsEvent = require("../db/models/GroupsEvents");
const Op = Sequelize.Op;

class GroupsEventService {
  get(id) {
    return GroupsEvent.findOne({
      where: {
        id
      }
    });
  }

  getAll() {
    return GroupsEvent.findAll({});
  }

  create(body) {
    return GroupsEvent.create({
      eventId: body.eventId,
      assignAt: body.assignAt,
      groupId: body.groupId
    });
  }

  update(body, id) {
    return GroupsEvent.update(body, {
      where: {
        id
      }
    });
  }

  delete(id) {
    return GroupsEvent.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = new GroupsEventService();
