import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:5000/refresh', {}, {
                    headers: { 'Authorization': 'Bearer ' + refreshToken }
                });

                const newAccessToken = response.data.access_token;
                localStorage.setItem('token', newAccessToken);

                originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                return instance(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // Handle refresh token expiration (e.g., logout user)
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;