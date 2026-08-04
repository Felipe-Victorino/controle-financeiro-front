import axios, {type AxiosInstance} from 'axios';


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

export default api;
