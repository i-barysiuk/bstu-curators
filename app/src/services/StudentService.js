import students from "../helper/students";

class StudentService {
  getAll() {
    return students();
  }
}

export default new StudentService();
