import api from "../helper/api";

class Events {
  getAllEvents() {
    return api("/g_events/");
  }

  async create(data) {
    const response = await api("/g_events/", "POST", data);
    return response.data;
  }
}

export default new Events();
