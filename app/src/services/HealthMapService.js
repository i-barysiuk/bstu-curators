import healthMap from "../helper/healthMap";

class HealthMapService {
  getLooses() {
    return healthMap();
  }
}

export default new HealthMapService();
