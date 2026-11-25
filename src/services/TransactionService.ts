import BaseService from "@/services/BaseService.ts";
import type {TransactionValues} from "@/types/Transactions/TransactionTypes.ts";

export class TransactionService extends BaseService {
    static #instance: TransactionService;

    base = (walletId: string) => `${walletId}/transactions`

    private constructor() {
        super('/wallets');
    }

    public static get instance() {
        if (!TransactionService.#instance) {
            this.#instance = new TransactionService();
        }

        return this.#instance;
    }

    toRequest(v: TransactionValues) {
        return {...v, categoryId: Number(v.categoryId), value: Number(v.value)}
    };

    async list(walletId: string) {
        return await this.getById(this.base(walletId))
    };

    async create(walletId: string, data: TransactionValues) {
        return await this.postWithTarget(this.base(walletId), this.toRequest(data))
    }

    async update(walletId: string, id: number, v: TransactionValues) {
        return await this.put(`${this.base(walletId)}/${id}`, this.toRequest(v))
    }

    async remove(walletId: string, id: number) {
        return await this.deleteWithTarget(`${this.base(walletId)}`, id);
    }


}