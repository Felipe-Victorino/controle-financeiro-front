import axios, {type AxiosInstance} from 'axios';
import type {NetworkErrorResponse} from "../types/ServerErrors.ts";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },

});

api.interceptors.request.use(
    (config) => {
        const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
        if (usuario?.token) {
            config.headers.Authorization = `Bearer ${usuario.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let renewalInProgress: Promise<any> | null = null;

const renewAccesstoken = () => {
    if (!renewalInProgress) {
        renewalInProgress = api
            .post('/autenticacao/refresh')
            .then((resposta) => {
                const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
                const usuarioAtualizado = { ...usuario, ...resposta.data };
                localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
                return usuarioAtualizado.token;
            })
            .catch((erro) => {
                localStorage.removeItem('usuario');
                window.location.href = '/login';
                throw erro;
            })
            .finally(() => {
                renewalInProgress = null;
            });
    }
    return renewalInProgress;
};


api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const isRefreshCall = originalRequest?.url?.includes('/auth/refresh');

        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshCall) {
            originalRequest._retry = true;
            const novoToken = await renewAccesstoken();
            originalRequest.headers.Authorization = `Bearer ${novoToken}`;
            return api(originalRequest);
        }

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
