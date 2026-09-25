import BaseService from "@/services/BaseService.ts";

export class TransactionService extends BaseService {
    static #instance: TransactionService;

    private constructor() {
        super('/transaction');
    }

    public static get instance() {
        if (!TransactionService.#instance) {
            this.#instance = new TransactionService();
        }

        return this.#instance;
    }
}