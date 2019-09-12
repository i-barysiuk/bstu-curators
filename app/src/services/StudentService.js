import api from "../helper/api";
import students from "../helper/students";

class StudentService {
  getAll() {
    return students();
  }

  async addStudent(data) {
    const response = await api(`/students/`, "POST", data);
    return response.data;
  }
}

export default new StudentService();
