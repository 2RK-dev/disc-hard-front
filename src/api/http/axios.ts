import axios from "axios";

const priv = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
});
priv.interceptors.request.use(config => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

const pub = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
});

export const http = {pub, priv};