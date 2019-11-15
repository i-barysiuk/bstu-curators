import api from "../helper/api";

class Events {
  getAllEvents() {
    return api("/events/");
  }
  getGroupsEvent(eventId) {
    return api(`/events/${eventId}`);
  }

  async addEvent(data) {
    const response = await api("/events/", "POST", data);
    return response.data;
  }
}

export default new Events();
