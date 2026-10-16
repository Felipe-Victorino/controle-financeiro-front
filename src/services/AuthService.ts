import BaseService from "./BaseService";
import type {AxiosResponse} from "axios";
import type {LoginValues} from "@/types/Requests.ts";

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
        return await this.insertIn("/forgot-password", {"email": email});
    }

    async registerNewUser(data: object): Promise<AxiosResponse> {
        return await this.insertIn("/register", data);
    }

    async resetPassword(data: object): Promise<AxiosResponse> {
        return await this.insertIn("/reset-password", data);
    }

    async login(data: LoginValues): Promise<AxiosResponse> {
        try {
            const resposta = await this.post('/login', data);
            localStorage.setItem(this.USER_KEY, JSON.stringify(resposta.data));
            return resposta.data;
        } catch (erro) {
            throw new Error('Email ou senha invalidos.');
        }
    }

    isAuthenticated(): boolean {
        return Boolean(localStorage.getItem(this.USER_KEY))
    };

    getCurrentuser():object{
        return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null')

    };


}


export default AuthService;