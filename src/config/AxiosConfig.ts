import axios, {AxiosError, type AxiosInstance} from 'axios';
import type {NetworkErrorResponse, ServerErrorResponse} from "../types/ServerErrors.ts";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('app-token');
        const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
        const tokenUsuario = usuario?.token;

        if (token || tokenUsuario) {
            config.headers.Authorization = `Bearer ${token || tokenUsuario}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError<ServerErrorResponse>) => {
        const localError: NetworkErrorResponse = {
            message: "Erro inesperado",
            isNetworkIssue: false,
            dateTime: new Date().toISOString()
        }

        if (!error.response) {
            localError.message = "Não foi possível se conectar ao servidor";
            localError.isNetworkIssue = true;
        } else if (error.response.data && error.response.data.description) {

            localError.message = error.response.data.description;
            localError.status = error.response.data.status;
            localError.dateTime = error.response.data.dateTime;
        } else {

            localError.message = error.message;
            localError.status = error.response.status;
        }

        return Promise.reject(localError);
    }
)

export default api;
