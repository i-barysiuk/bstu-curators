const Sequelize = require("sequelize");
const Student = require("../db/models/Student");
const Op = Sequelize.Op;

class StudentService {
  get(id) {
    return Student.findOne({
      where: {
        id
      }
    });
  }

  find(user) {
    return Student.findOne({
      where: {
        [Op.or]: [{ passportId: user }, { studentId: user }, { id: user }]
      }
    });
  }

  getAll() {
    return Student.findAll({});
  }

  create(body) {
    return Student.findOrCreate({
      where: {
        id: body.id
      },
      defaults: {
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        onlineAt: body.onlineAt,
        studentId: body.studentId,
        first_name: body.first_name,
        last_name: body.last_name,
        f_name: body.f_name,
        birthday: body.birthday,
        sex: body.sex,
        passport_series: body.passport_series,
        passportId: body.passportId,
        issuing_authority: body.issuing_authority,
        date_issue: body.date_issue,
        nationality: body.nationality,
        home_adress: body.home_adress,
        study_adress: body.study_adress,
        chronic_disease: body.chronic_disease,
        health_group: body.health_group,
        pe_group: body.pe_group,
        faculty: body.faculty,
        group: body.group,
        hobbies: body.hobbies,
        phone: body.phone,
        email: body.email,
        position: body.position,
        representatives: body.representatives,
        isActive: body.isActive
      }
    });
  }

  select(where) {
    return Student.findAll({
      where: where
    });
  }

  update(body, id) {
    return Student.update(body, {
      where: {
        id
      }
    });
  }

  delete(id) {
    return Student.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = new StudentService();
