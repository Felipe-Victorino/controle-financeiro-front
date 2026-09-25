import BaseService from "@/services/BaseService.ts";

export class WalletService extends BaseService {
    static #instance: WalletService;

    private constructor() {
        super('/transaction');
    }

    public static get instance() {
        if (!WalletService.#instance) {
            this.#instance = new WalletService();
        }

        return this.#instance;
    }
}