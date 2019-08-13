import api from "../helper/api";

class Groups {
  async getGroups() {
    const response = await api("/groups");
    return response.data;
  }
}

export default new Groups();
