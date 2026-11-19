import BaseService from "@/services/BaseService.ts";
import type {TransactionValues} from "@/pages/Transactions/types/TransactionTypes.ts";

export class TransactionService extends BaseService {
    static #instance: TransactionService;

    base = (walletId: string) => `/wallet/${walletId}/transactions`

    private constructor() {
        super('');
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
        return this.getWithTarget(this.base(walletId))
    };

    async create(walletId: string, data: TransactionValues) {
        return this.postWithTarget(this.base(walletId), this.toRequest(data))
    }

    async update(walletId: string, id: number, v: TransactionValues) {
        return this.putWithTarget(`${this.base(walletId)}/${id}`, this.toRequest(v))
    }

    async remove(walletId: string, id: number) {
        return this.deleteWithTarget(`${this.base(walletId)}`, id);
    }


}