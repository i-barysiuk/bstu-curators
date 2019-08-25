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

  async getGroup({ id }) {
    const response = await api(`/groups/${id}`);
    return response.data;
  }

  async editGroup({ data, id }) {
    const response = await api(`/groups/${id}`, "PUT", data);
    return response.data;
  }

  async addGroup(data) {
    const response = await api(`/groups/`, "POST", data);
    return response.data;
  }

  async addFavoriteGroup({ id }) {
    const response = await api(`/groups/${id}/add_favorite`, "PUT");
    return response.data;
  }

  async removeFavoriteGroup({ id }) {
    const response = await api(`/groups/${id}/remove_favorite`, "PUT");
    return response.data;
  }
}

export default new Groups();
