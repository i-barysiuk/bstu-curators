import api from "../helper/api";

class Groups {
  async getMyAndFavoriteGroups() {
    const response = await api("/groups/");
    return response.data;
  }

  async getAllGroups() {
    const response = await api("/groups/all");
    return response.data;
  }
  async getArchiveGroups() {
    const response = await api("/groups/archive");
    return response.data;
  }

  async getActiveGroup({ id }) {
    const response = await api(`/groups/${id}`);
    return response.data;
  }
}

export default new Groups();
