import BaseService from "@/services/BaseService.ts";

export class WalletMemberService extends BaseService {
    static #instance: WalletMemberService;

    private constructor() {
        super('/transaction');
    }

    public static get instance() {
        if (!WalletMemberService.#instance) {
            this.#instance = new WalletMemberService();
        }

        return this.#instance;
    }
}