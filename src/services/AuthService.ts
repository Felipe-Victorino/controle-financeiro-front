import BaseService from "./BaseService";
import type {AxiosResponse} from "axios";
import type {LoginValues} from "@/types/Auth/AuthRequests.ts";
import type {UserType} from "@/types/UserType.ts";

class AuthService extends BaseService {

    static #instance: AuthService;

    USER_KEY: string = "user";

    private constructor() {
        super('/auth');

    }

    public static get instance(): AuthService {
        if (!AuthService.#instance) {
            this.#instance = new AuthService();
        }

        return this.#instance;
    }

    async requestResetCode(email: string): Promise<AxiosResponse> {
        return await this.postWithTarget("/forgot-password", {"email": email});
    }

    async registerNewUser(data: object): Promise<AxiosResponse> {
        return await this.postWithTarget("/register", data);
    }

    async resetPassword(data: object): Promise<AxiosResponse> {
        return await this.postWithTarget("/reset-password", data);
    }

    async login(data: LoginValues): Promise<AxiosResponse> {
        try {
            const resposta = await this.postWithTarget('/login', data);
            localStorage.setItem(this.USER_KEY, JSON.stringify(resposta.data));
            return resposta.data;
        } catch (erro) {
            throw new Error('Email ou senha invalidos.');
        }
    }

    async logout() {
        if (this.isAuthenticated()) {
            localStorage.clear();
            sessionStorage.clear();
            await this.post("/logout");
        }
    }

    isAuthenticated(): boolean {
        return Boolean(localStorage.getItem(this.USER_KEY))
    };

    getCurrentuser(): UserType {
        return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null') as UserType

    };

    getCurrentUsername(): string {
        const user: UserType = this.getCurrentuser();
        return user.name;
    }


}


export default AuthService;