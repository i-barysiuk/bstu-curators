import api from "../helper/api";

class UserService {
  whoAmI() {
    return api("/users/me");
  }

  getAllLike(like) {
    console.log(like);
    return api("/users/like", "POST", { value: like });
  }
}

export default new UserService();
