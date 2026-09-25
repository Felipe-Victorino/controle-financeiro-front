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
}