import api from "../helper/api";

class UserService {
  whoAmI() {
    return api("/users/me");
  }

  getAllCurators() {
    return api("/users");
  }
}

export default new UserService();
