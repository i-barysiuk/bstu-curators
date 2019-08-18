import api from "../helper/api";
import curators from "../helper/curators";

class UserService {
  whoAmI() {
    return api("/users/me");
  }

  getAllCurators() {
    return curators();
  }
}

export default new UserService();
