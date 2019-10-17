const Sequelize = require("sequelize");
const GroupsEvent = require("../db/models/GroupsEvents");
const Events = require("../db/models/Events");
const Op = Sequelize.Op;

class GroupsEventService {
  get(groupId) {
    return GroupsEvent.findAll({
      include: [{ model: Events }],
      where: {
        groupId
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
