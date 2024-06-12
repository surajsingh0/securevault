import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // This will ensure cookies are sent with requests
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRrefreshed = (token) => {
    refreshSubscribers.map((callback) => callback(token));
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

// Response interceptor to handle 401 errors and retry requests
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;
        const originalRequest = config;

        if (response && response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    addRefreshSubscriber((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axiosInstance.post(
                    "/refresh",
                    {},
                    { withCredentials: true }
                );
                const newAccessToken = data.access_token;

                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;
                onRrefreshed(newAccessToken);
                isRefreshing = false;
                refreshSubscribers = [];

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error(
                    "Refresh token expired or invalid:",
                    refreshError
                );
                isRefreshing = false;
                refreshSubscribers = [];
                // Redirect to login or handle the error as needed
                const navigate = useNavigate();
                navigate("/login");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
