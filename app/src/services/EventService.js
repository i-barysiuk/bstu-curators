import api from "../helper/api";

class Events {
  getAllEvents() {
    return api("/events/");
  }

  async addEvent(data) {
    const response = await api("/events/", "POST", data);
    return response.data;
  }
}

export default new Events();
