import axios from "axios";

export const http = {
    pub: axios.create({
        baseURL: process.env.API_BASE_URL,
        withCredentials: true,
    }),
    priv: axios.create({
        baseURL: process.env.API_BASE_URL,
        withCredentials: true,
        transformRequest: (_data, headers) => {
            headers.Authorization = localStorage.getItem("access_token");
        }
    })
};