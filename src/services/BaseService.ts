import api from '../config/AxiosConfig';

abstract class BaseService {

    endPoint: string;

    protected constructor(endPoint: string) {
        this.endPoint = endPoint;
    }

    async postWithTarget(target: string, data: object) {
        return await api.post(this.endPoint + target, data);
    }

    async insert(data: object) {
        return await api.post(this.endPoint, data);
    }

    async post(target: string, data?: object | null | undefined) {
        return await api.post(this.endPoint + target, data);
    }

    async put(id: number, data: object) {
        return await api.put(`${this.endPoint}/${id}`, data);
    }

    async putWithTarget(target: string, data: object | null) {
        return await api.put(this.endPoint + target, data);
    }

    async delete(id: number) {
        return await api.delete(`${this.endPoint}/${id}`);
    }

    async deleteWithTarget(target: string, id:number){
        return await api.delete(`${this.endPoint}${target}/${id}`);
    }

    async getWithTarget(target: string) {
        return await api.get(this.endPoint + target);
    }

    async getById(id: number) {
        return await api.get(`${this.endPoint}/${id}`);
    }

    async getByParam(param: string) {
        return await api.get(`${this.endPoint}/${param}`);
    }

    async get() {
        return await api.get(this.endPoint);
    }
}

export default BaseService;