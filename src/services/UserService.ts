import BaseService from "./BaseService";

class UserService extends BaseService {

    static #instance: UserService;

    private constructor() {
        super('users/me');
    }

    public static get instance() {
        if (!UserService.#instance) {
            this.#instance = new UserService();
        }

        return this.#instance;
    }

    async getAuthenticatedUserData() {
        return this.get();
    }
}

export default UserService;