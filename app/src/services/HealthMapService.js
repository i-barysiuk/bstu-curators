import healthMap from "../helper/healthMap";

class HealthMapService {
  getData(type = "WEEK") {
    switch (type) {
      case "DAY":
        return healthMap().byDays;
      case "WEEK":
        return healthMap().byWeeks;
      case "MONTH":
        return healthMap().byMonths;
      case "SEM":
        return healthMap().bySems;
    }
  }
}

export default new HealthMapService();
