const Sequelize = require("sequelize");
const Event = require("../db/models/Events");
const Op = Sequelize.Op;

class EventService {
  get(id) {
    return Event.findOne({
      where: {
        id
      }
    });
  }

  getAll() {
    return Event.findAll({});
  }

  create(body) {
    return Event.findOrCreate({
      where: {
        id: body.id
      },
      defaults: {
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        onlineAt: body.onlineAt,
        creator: body.creator,
        title: body.title,
        subtitle: body.subtitle,
        place: body.place,
        dataStart: body.dataStart,
        dataEnd: body.dataEnd,
        customIcon: body.customIcon,
        description: body.description
      }
    });
  }

  select(where) {
    return Event.findAll({
      where: where
    });
  }

  update(body, id) {
    return Event.update(body, {
      where: {
        id
      }
    });
  }

  delete(id) {
    return Event.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = new EventService();
