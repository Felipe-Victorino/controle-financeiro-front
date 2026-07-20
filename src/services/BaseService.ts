import api from '../config/AxiosConfig';

abstract class BaseService {

    endPoint: string;


    constructor(endPoint: string) {
        this.endPoint = endPoint;
    }

    async insert(data: object) {
        return await api.post(this.endPoint, data);
    }

    async update(data: object) {
        return await api.put(this.endPoint, data);
    }

    async delete(id: number) {
        return await api.delete(`${this.endPoint}/${id}`);
    }


    async getAll() {
        return await api.get(this.endPoint);
    }
}

export default BaseService;