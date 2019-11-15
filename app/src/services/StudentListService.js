import api from "../helper/api";

class Students {
  getAllStudents() {
    return api("/students/");
  }

  getStudentsGroup(groupId) {
    return api(`/students/group/${groupId}`);
  }
}

export default new Students();
