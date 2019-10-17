import api from "../helper/api";

class UserService {
    whoAmI() {
        return api("/users/me");
    }

    getAllLike(like) {
        console.log(like);
        return api("/users/like", "POST", { value: like });
    }

    setAvatar(imageUrl) {
        return api(`/users/setAvatar`, "POST", { imageUrl: imageUrl });
    }
}

export default new UserService();