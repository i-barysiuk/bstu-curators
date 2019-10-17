import api from "../helper/api";

class GroupsEvents {
  getAllEvents() {
    return api("/g_events/");
  }

  getGroupsEvent(groupId) {
    return api(`/g_events/${groupId}`);
  }

  async create(data) {
    const response = await api("/g_events/", "POST", data);
    return response.data;
  }
}

export default new GroupsEvents();
