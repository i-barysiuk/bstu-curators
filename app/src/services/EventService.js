import api from "../helper/api";

class Events {
  async getAllEvents() {
    const response = await api("/events/");
    return response.data;
  }

  async addEvent(data) {
    const response = await api("/events/", "POST", data);
    return response.data;
  }
}

export default new Events();
