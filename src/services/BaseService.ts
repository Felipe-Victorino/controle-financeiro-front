import api from '../config/AxiosConfig';

abstract class BaseService {

    endPoint: string;

    protected constructor(endPoint: string) {
        this.endPoint = endPoint;
    }

    async post<T = any>(data: object) {
        return await api.post<T>(this.endPoint, data);
    }

    async postWithTarget<T = any>(target: string, data?: object | null | undefined) {
        return await api.post<T>(`${this.endPoint}/${target}`, data);
    }

    async put<T = any>(id: number | string, data: object | null) {
        return await api.put<T>(`${this.endPoint}/${id}`, data);
    }

    async delete(id: number | string) {
        return await api.delete(`${this.endPoint}/${id}`);
    }

    async deleteWithTarget(target: string, id: number | string) {
        return await api.delete(`${this.endPoint}/${target}/${id}`);
    }


    async getById(id: string | number) {
        return await api.get(`${this.endPoint}/${id}`);
    }

    async get<T = any>(target?: string | number | undefined) {
        return await api.get<T>(target === undefined ? this.endPoint : `${this.endPoint}/${target}`);
    }
}

export default BaseService;