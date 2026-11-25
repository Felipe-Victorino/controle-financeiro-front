import BaseService from "@/services/BaseService.ts";
import type {WalletValues} from "@/types/Wallets/WalletType.ts";


export class WalletService extends BaseService {
    static #instance: WalletService;

    private constructor() {
        super('/wallets');
    }

    public static get instance() {
        if (!WalletService.#instance) {
            this.#instance = new WalletService();
        }

        return this.#instance;
    }

    async list(walletId: string) {
        return await this.getById(walletId)
    }

    async update(walletId: string, v: WalletValues) {
        return await this.put(walletId, v);
    }

    async create(v: WalletValues) {
        return await this.post(v);
    }

    async remove(walletId: string) {
        return await this.delete(walletId);
    }


}