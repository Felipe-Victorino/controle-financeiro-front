import BaseService from "@/services/BaseService.ts";

export class CategoryService extends BaseService {

    static #instance: CategoryService;

    private constructor() {
        super('/category');
    }

    public static get instance() {
        if (!CategoryService.#instance) {
            this.#instance = new CategoryService();
        }

        return this.#instance;
    }

    async getCategoryList() {
        return await this.get();
    }

    async createCategory(values: object) {
        return await this.insert(values);
    }

    async updateCategory(id: number, data: object) {
        return await this.put(id, data);
    }

    async deleteCategory(id: number) {
        return await this.delete(id);
    }

    async deactivateCategory(id: number) {
        return await this.putWithTarget(`/deactivate/${id}`, {})
    }


}