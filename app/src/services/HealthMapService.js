import healthMap from "../helper/healthMap";

class HealthMapService {
  byDays() {
    return healthMap().byDays;
  }

  byWeeks() {
    return healthMap().byWeeks;
  }

  byMonths() {
    return healthMap().byMonths;
  }

  bySems() {
    return healthMap().bySems;
  }
}

export default new HealthMapService();
