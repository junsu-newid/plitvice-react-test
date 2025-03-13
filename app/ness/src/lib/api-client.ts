import Axios, { InternalAxiosRequestConfig } from 'axios';

// import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
        config.headers.Accept = 'application/json';
    }

    // 클라이언트에서 쿠키를 보내기 위해 필요
    config.withCredentials = true;
    return config;
}

export const api = Axios.create({
    baseURL: env.API_URL,
    // baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // const message = error.response?.data?.message || error.message;
        // useNotifications.getState().addNotification({
        //   type: 'error',
        //   title: 'Error',
        //   message,
        // });
        if (error.response?.status === 401) {
            //TODO: Implement logic later
        }

        return Promise.reject(error);
    },
);
