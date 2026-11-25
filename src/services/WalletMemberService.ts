import BaseService from "@/services/BaseService.ts";
import type {MemberRole, WalletMemberValues} from "@/types/Wallets/WalletType.ts";

export class WalletMemberService extends BaseService {
    static #instance: WalletMemberService;

    private constructor() {
        super('/wallets');
    }

    base = (walletId: string) => `${walletId}/members`

    public static get instance() {
        if (!WalletMemberService.#instance) {
            this.#instance = new WalletMemberService();
        }

        return this.#instance;
    }

    async list(walletId: string) {
        return await this.get(this.base(walletId))
    };

    async create(walletId: string, data: WalletMemberValues) {
        return await this.postWithTarget(this.base(walletId), data)
    }

    async updateRole(walletId: string, id: number, v: { role: MemberRole }) {
        return await this.put(`${this.base(walletId)}/${id}`, v)
    }

    async remove(walletId: string, id: number) {
        return await this.deleteWithTarget(`${this.base(walletId)}`, id);
    }


}