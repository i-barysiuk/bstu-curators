import api from "../helper/api";

class Students {
  async getAllStudents() {
    const response = await api("/students/all");
    return response.data;
  }

  async getStudentsGroup({ groupId }) {
    const response = await api(`/students/${groupId}`);
    return response.data;
  }
}

export default new Students();
