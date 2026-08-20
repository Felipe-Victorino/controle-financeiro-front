import BaseService from "./BaseService";
import type {AxiosResponse} from "axios";

class AuthService extends BaseService {

    constructor() {
        super('/auth');

    }

    async requestResetCode(email: string): Promise<AxiosResponse> {
        return await this.insertIn("/forgot-password", {"email": email});
    }

    async registerNewUser(data: object): Promise<AxiosResponse> {
        return await this.insertIn("/register", data);
    }

    async resetPassword(data: object): Promise<AxiosResponse> {
        return await this.insertIn("/reset-password", data);
    }

    async loginUser(data: object): Promise<AxiosResponse> {
        return await this.insertIn("/login", data);
    }
}

export const authService: AuthService = new AuthService();

export default AuthService;